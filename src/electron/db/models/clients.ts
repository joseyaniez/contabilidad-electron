import { DB } from "../connection.js";
import { Client } from "../../../types/models/client.js";

function createClientsTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT,
      ruc TEXT,
      address TEXT,
      name TEXT
    )
  `;

  DB.run(sql, [], (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Clients table created");
  });
}

function saveClient(dni: string, ruc: string, address: string, name: string): Promise<Client> {
  const sql = `
    INSERT INTO clients (dni, ruc, address, name)
    VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    DB.run(sql, [dni, ruc, address, name], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: this.lastID.toString(), dni, ruc, address, name });
    });
  });
}

function findClients(dni: string, ruc: string, name: string): Promise<Array<Client>> {
  if(dni === "" && ruc === "" && name === "") {
    console.log("No search parameters provided");
    return Promise.resolve([]);
  }

  console.log(`Searching clients with dni: ${dni}, ruc: ${ruc}, name: ${name}`);

  const dniSearch = `%${dni.toUpperCase()}%`;
  const rucSearch = `%${ruc.toUpperCase()}%`;
  const nameSearch = `%${name.toUpperCase()}%`;

  const sql = `
    SELECT * FROM clients
    WHERE UPPER(dni) LIKE ?
      OR UPPER(ruc) LIKE ?
      OR UPPER(name) LIKE ?
  `;

  return new Promise((resolve, reject) => {
    DB.all<Client>(sql, [dniSearch, rucSearch, nameSearch], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Found ${rows.length} clients`);
      resolve(rows);
    });
  });
}

export default { createClientsTable, saveClient, findClients };
