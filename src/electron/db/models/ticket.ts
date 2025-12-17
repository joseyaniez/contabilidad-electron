
import { Client } from "../../../types/models/client.js";
import type { DateState } from "../../../types/util.js";
import { Ticket, GetTicketsResponse } from "../../../types/models/ticket.js";
import { TicketItem } from "../../../types/models/ticketItem.js";
import { DB } from "../connection.js";

function createTicketTable(){
  let sql = `
    CREATE TABLE IF NOT EXISTS tickets (
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
    console.log("Tickets table created");
  });
}

function getTicketNumber(serie: string): Promise<number> {
  let query = "SELECT serie, max(number) num FROM tickets WHERE serie = ? GROUP BY serie"
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

function getTicketsBetween(initialDate: string, finalDate: string): Promise<Array<Ticket>> {
  let query = `
    SELECT 
      t.id AS ticketId,
      t.serie AS ticketSerie,
      t.date AS ticketDate,
      t.number AS ticketNumber,

      c.id AS clientId,
      c.name AS clientName,
      c.dni AS clientDni,
      c.ruc AS clientRuc,
      c.address AS clientAddress,

      i.id AS itemId,
      i.description AS itemDescription,
      i.unit AS itemUnit,
      i.quantity AS itemQuantity,
      i.unit_price AS itemUnitPrice,
      i.import_price AS itemImportPrice
      
    FROM tickets t
    LEFT JOIN clients c ON c.id = t.client_id
    LEFT JOIN ticket_items i ON i.ticket_id = t.id
    WHERE t.date BETWEEN ? AND ? 
    ORDER BY t.date DESC
  `
  return new Promise((resolve, reject) => {
    console.log(initialDate, finalDate)
    DB.all<GetTicketsResponse>(query, [initialDate, finalDate], (err, rows) => {
      if(err){
        console.log("Error al obtener todos los tickets: " + err)
        reject(err);
        return
      }

      let tickets: Array<Ticket> = [];
      let map: Map<string, Ticket> = new Map();

      for(const row of rows){
        if(!map.get(row.ticketId)){
          map.set(row.ticketId, {
            id: row.ticketId,
            dateString: row.ticketDate,
            serie: row.ticketSerie,
            number: row.ticketNumber,
            client: {
              id: row.clientId,
              name: row.clientName,
              dni: row.clientDni ?? '',
              ruc: row.clientRuc ?? '',
              address: row.clientAddress,
            },
            productsList: []
          });
          tickets.push(map.get(row.ticketId)!);
        }

        if(row.itemId){
          map.get(row.ticketId)?.productsList.push({
            id: row.itemId,
            description: row.itemDescription,
            unit: row.itemUnit,
            unitPrice: row.itemUnitPrice,
            importPrice: row.itemImportPrice,
            quantity: row.itemQuantity,
            ticketId: row.ticketId
          })
        }
      }
      resolve(tickets);
    });
  })
}

function getCompleteTickets(dateState: DateState): Promise<Array<Ticket>> {
  let initialDate = '';
  const actualDate = new Date();
  const d = new Date();
  switch(dateState){
    case 'day':
      d.setDate(d.getDate() - 1)
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    case "yesterday":
      actualDate.setDate(actualDate.getDate() - 1)
      d.setDate(d.getDate() - 2)
      initialDate = d.toISOString().replace('T', ' ').replace('Z', '');
      break;
    case "before-yesterday":
      actualDate.setDate(actualDate.getDate() - 2)
      d.setDate(d.getDate() - 3);
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
      t.id AS ticketId,
      t.serie AS ticketSerie,
      t.date AS ticketDate,
      t.number AS ticketNumber,

      c.id AS clientId,
      c.name AS clientName,
      c.dni AS clientDni,
      c.ruc AS clientRuc,
      c.address AS clientAddress,

      i.id AS itemId,
      i.description AS itemDescription,
      i.unit AS itemUnit,
      i.quantity AS itemQuantity,
      i.unit_price AS itemUnitPrice,
      i.import_price AS itemImportPrice
      
    FROM tickets t
    LEFT JOIN cancellations j ON j.cancellableId = t.id AND j.cancellableType = 'B'
    LEFT JOIN clients c ON c.id = t.client_id
    LEFT JOIN ticket_items i ON i.ticket_id = t.id
    WHERE j.cancellableId IS NULL AND t.date BETWEEN ? AND ? 
    ORDER BY t.date DESC
  `
  return new Promise((resolve, reject) => {
    DB.all<GetTicketsResponse>(query, [initialDate, actualDate.toISOString().replace('T', ' ').replace('Z', '')], (err, rows) => {
      if(err){
        console.log("Error al obtener todos los tickets: " + err)
        reject(err);
        return
      }

      let tickets: Array<Ticket> = [];
      let map: Map<string, Ticket> = new Map();

      for(const row of rows){
        if(!map.get(row.ticketId)){
          map.set(row.ticketId, {
            id: row.ticketId,
            dateString: row.ticketDate,
            serie: row.ticketSerie,
            number: row.ticketNumber,
            client: {
              id: row.clientId,
              name: row.clientName,
              dni: row.clientDni ?? '',
              ruc: row.clientRuc ?? '',
              address: row.clientAddress,
            },
            productsList: []
          });
          tickets.push(map.get(row.ticketId)!);
        }

        if(row.itemId){
          map.get(row.ticketId)?.productsList.push({
            id: row.itemId,
            description: row.itemDescription,
            unit: row.itemUnit,
            unitPrice: row.itemUnitPrice,
            importPrice: row.itemImportPrice,
            quantity: row.itemQuantity,
            ticketId: row.ticketId
          })
        }
      }
      resolve(tickets);
    });
  })
}

function getCompleteTicket(serie: string, ticketNumber: string): Promise<Ticket> {
  let query = "SELECT * FROM tickets WHERE serie = ? AND number = ?";
  return new Promise((resolve, reject) => {
    DB.get<{id: string, serie: string, number: number, date: string, client_id: number}>(query, [serie, ticketNumber], (err, row) => {
      if(err) {
        reject(err);
        return
      }

      let items: Array<TicketItem> = [];
      let queryTicketItems = "SELECT * FROM ticket_items WHERE ticket_id = ?";
      DB.all<{id: string, description: string, unit: string, quantity: number, unit_price: number, import_price:number, ticket_id: string}>(queryTicketItems, [row.id], (err, rows) => {
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
            ticketId: r.ticket_id
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

function saveTicket(serie: string, number: number, dateString: string, clientId: string, productsItem: Array<TicketItem>): Promise<number>{
  let sql = `
    INSERT INTO tickets(serie, number, date, client_id)
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
        const ticketId = this.lastID;

        let stmt = DB.prepare(`
          INSERT INTO ticket_items (description, unit, quantity, unit_price, import_price, ticket_id)
          VALUES (?, ?, ?, ?, ?, ?)
        `)

        productsItem.forEach((prod) => {
          stmt.run(prod.description, prod.unit, prod.quantity, prod.unitPrice, prod.importPrice, ticketId, (err: Error) => {
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
            resolve(ticketId);
          })
        });

      })
    })
  });
}

export default {createTicketTable, saveTicket, getCompleteTicket, getCompleteTickets, getTicketNumber, getTicketsBetween}
