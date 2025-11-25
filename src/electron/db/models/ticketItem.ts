import { DB } from "../connection.js";

function createTicketItemTable(){
  let sql = `
    CREATE TABLE IF NOT EXISTS ticket_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      unit TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      import_price REAL NOT NULL,
      ticket_id INTEGER NOT NULL,
      
      FOREIGN KEY(ticket_id)
        REFERENCES tickets(id)
        ON DELETE CASCADE
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

export default { createTicketItemTable }
