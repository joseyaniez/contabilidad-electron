
import { DB } from "../connection.js";

function createCancellationTable() {
  let query = `
    CREATE TABLE IF NOT EXISTS cancellations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cause TEXT NOT NULL,
      cancellableType TEXT NOT NULL,
      cancellableId INTEGER NOT NULL
    )
  `;
  DB.run(query, [], (err) => {
    if(err){
      console.log("Error al crear la tabla Cancellation: " + err);
      return;
    }
    console.log("Cancellation table created")
  })
}

function saveCancellation(cause: string, type: 'B' | 'F', id: string): Promise<number>{
  let query = `
    INSERT INTO cancellations(cause, cancellableType, cancellableId)
    VALUES (?,?,?)
  `;
  return new Promise((resolve, reject) => {
    DB.run(query, [cause, type, id], function (err) {
      if(err){
        console.log("No se pudo crear una baja: " + err)
        reject(err)
        return;
      }
      resolve(this.lastID);
    })
  })
}

export default {createCancellationTable, saveCancellation}
