
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

function saveTicket(serie: string, number: number, dateString: string, clientId: string, productsItem: Array<TicketItem>): Promise<number>{


  let sql = `
    INSERT INTO tickets(serie, number, date, client_id)
    VALUES (?,?,?,?)
  `;

  return new Promise((resolve, reject) => {
    DB.serialize(() => {

      // 1. Iniciar transacción
      DB.run("BEGIN TRANSACTION");

      console.log(serie, number, dateString, clientId, productsItem);
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

export default {createTicketTable, saveTicket}
