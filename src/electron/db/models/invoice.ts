import { Client } from "../../../types/models/client.js";
import { Ticket } from "../../../types/models/ticket.js";
import { InvoiceItem } from "../../../types/models/invoiceItem.js"
import { DB } from "../connection.js";
import { DateState } from "../../../types/util.js";
import { GetInvoicesResponse, Invoice } from "../../../types/models/invoice.js";

function createInvoiceTable(){
  let sql = `
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serie TEXT NOT NULL,
      number INTEGER NOT NULL,
      date TEXT NOT NULL,
      client_id INTEGER NOT NULL,
      
      FOREIGN KEY(client_id)
        REFERENCES clients(id)
    )
  `;

  DB.run(sql, [], (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Invoices table created");
  });
}

function getInvoiceNumber(serie: string): Promise<number> {
  let query = "SELECT serie, max(number) num FROM invoices WHERE serie = ? GROUP BY serie"
  return new Promise((resolve, reject) => {
    DB.get<{serie: string, num: number}>(query, [serie], (err, row) => {
      if(err){
        reject(err);
        return
      }
      if(row == undefined){
        resolve(1);
        return
      }
      const number = row.num;
      resolve(number+1)
    })
  })
}

function getCompleteInvoices(dateState: DateState): Promise<Array<Invoice>> {
  console.log("llamando a getCompleteInvoices")
  let initialDate = '';
  const actualDate = new Date();
  const d = new Date();
  switch(dateState){
    case 'day':
      d.setDate(d.getDate() - 1)
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    case "yesterday":
      actualDate.setDate(actualDate.getDay() - 1)
      d.setDate(d.getDate() - 2)
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    case "before-yesterday":
      actualDate.setDate(actualDate.getDay() - 2)
      d.setMonth(d.getMonth() - 3);
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    case "full":
      d.setFullYear(d.getFullYear() - 7);
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    default:
      d.setFullYear(d.getFullYear() - 7);
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
  }
  let query = `
    SELECT 
      i.id AS invoiceId,
      i.serie AS invoiceSerie,
      i.date AS invoiceDate,
      i.number AS invoiceNumber,

      c.id AS clientId,
      c.name AS clientName,
      c.dni AS clientDni,
      c.ruc AS clientRuc,
      c.address AS clientAddress,

      it.id AS itemId,
      it.description AS itemDescription,
      it.unit AS itemUnit,
      it.quantity AS itemQuantity,
      it.unit_price AS itemUnitPrice,
      it.import_price AS itemImportPrice

    FROM invoices i
    LEFT JOIN cancellations j ON j.cancellableId = i.id AND j.cancellableType = 'F'
    LEFT JOIN clients c ON c.id = i.client_id
    LEFT JOIN invoice_items it ON it.invoice_id = i.id
    WHERE j.cancellableId IS NULL AND i.date BETWEEN ? AND ?
    ORDER BY i.date ASC
  `
  return new Promise((resolve, reject) => {
    DB.all<GetInvoicesResponse>(query, [initialDate, actualDate.toISOString().replace('T', ' ').replace('Z', '')], (err, rows) => {
      if(err){
        console.log("Error al obtener todos los tickets: " + err)
        reject(err);
        return
      }

      let invoices: Array<Ticket> = [];
      let map: Map<string, Ticket> = new Map();

      for(const row of rows){
        if(!map.get(row.invoiceId)){
          map.set(row.invoiceId, {
            id: row.invoiceId,
            dateString: row.invoiceDate,
            serie: row.invoiceSerie,
            number: row.invoiceNumber,
            client: {
              id: row.clientId,
              name: row.clientName,
              dni: row.clientDni ?? '',
              ruc: row.clientRuc ?? '',
              address: row.clientAddress,
            },
            productsList: []
          });
          invoices.push(map.get(row.invoiceId)!);
        }

        if(row.itemId){
          map.get(row.invoiceId)?.productsList.push({
            id: row.itemId,
            description: row.itemDescription,
            unit: row.itemUnit,
            unitPrice: row.itemUnitPrice,
            importPrice: row.itemImportPrice,
            quantity: row.itemQuantity,
            ticketId: row.invoiceId
          })
        }
      }
      resolve(invoices);
    });
  })
}

function getCompleteInvoice(serie: string, invoiceNumber: string): Promise<Ticket> {
  let query = "SELECT * FROM invoices WHERE serie = ? AND number = ?";
  return new Promise((resolve, reject) => {
    DB.get<{id: string, serie: string, number: number, date: string, client_id: number}>(query, [serie, invoiceNumber], (err, row) => {
      if(err) {
        reject(err);
        return
      }

      let items: Array<InvoiceItem> = [];
      let queryTicketItems = "SELECT * FROM invoice_items WHERE invoice_id = ?";
      DB.all<{id: string, description: string, unit: string, quantity: number, unit_price: number, import_price:number, invoice_id: string}>(queryTicketItems, [row.id], (err, rows) => {
        if(err){
          reject(err);
          return
        }
        rows.forEach((r) => {
          items.push({
            id: r.id, 
            description: r.description, 
            unit: r.unit, 
            quantity: r.quantity, 
            unitPrice: r.unit_price,
            importPrice: r.import_price,
            ticketId: r.invoice_id
          })
        })
        let queryClient = "SELECT * FROM clients WHERE id = ?";
        let client: Client | null;
        DB.get<Client>(queryClient, [row.client_id], (err, rowClient) => {
          if(err){
            reject(err);
            return
          }
          client = rowClient;


          let result = {
            id: row.id,
            serie: row.serie,
            number: row.number,
            dateString: row.date,
            client: client,
            productsList: items
          }
          resolve(result);
        })
      })
    })
  })
}

function saveInvoice(serie: string, number: number, dateString: string, clientId: string, productsItem: Array<InvoiceItem>): Promise<number>{
  let sql = `
    INSERT INTO invoices(serie, number, date, client_id)
    VALUES (?,?,?,?)
  `;

  return new Promise((resolve, reject) => {
    DB.serialize(() => {

      // 1. Iniciar transacción
      DB.run("BEGIN TRANSACTION");

      DB.run(sql, [serie, number, dateString, clientId], function(err){
        if(err){
          DB.run("ROLLBACK");
          reject(err);
          return;
        }
        const invoiceId = this.lastID;

        let stmt = DB.prepare(`
          INSERT INTO invoice_items (description, unit, quantity, unit_price, import_price, invoice_id)
          VALUES (?, ?, ?, ?, ?, ?)
        `)

        productsItem.forEach((prod) => {
          stmt.run(prod.description, prod.unit, prod.quantity, prod.unitPrice, prod.importPrice, invoiceId, (err: Error) => {
            if(err){
              stmt.finalize();
              DB.run("ROLLBACK");
              reject(err);
              return;
            }
          });
        })

        stmt.finalize((err) => {
          if(err){
            DB.run("ROLLBACK");
            reject(err);
            return
          }

          DB.run("COMMIT", function(err){
            if(err){
              reject(err);
              return;
            }
            resolve(invoiceId);
          })
        });

      })
    })
  });
}

export default {createInvoiceTable, saveInvoice, getCompleteInvoice, getCompleteInvoices, getInvoiceNumber}
