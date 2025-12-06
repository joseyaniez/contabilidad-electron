import { Client } from "../../../types/models/client.js";
import { Ticket } from "../../../types/models/ticket.js";
import { InvoiceItem } from "../../../types/models/invoiceItem.js"
import { DB } from "../connection.js";

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

export default {createInvoiceTable, saveInvoice, getCompleteInvoice, getInvoiceNumber}
