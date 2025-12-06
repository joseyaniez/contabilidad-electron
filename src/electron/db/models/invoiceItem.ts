import { DB } from "../connection.js";

function createTicketItemTable(){
  let sql = `
    CREATE TABLE IF NOT EXISTS invoice_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      unit TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      import_price REAL NOT NULL,
      invoice_id INTEGER NOT NULL,
      
      FOREIGN KEY(invoice_id)
        REFERENCES invoices(id)
        ON DELETE CASCADE
    )
  `;

  DB.run(sql, [], (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("InvoiceItems table created");
  });
}

export default { createTicketItemTable }
