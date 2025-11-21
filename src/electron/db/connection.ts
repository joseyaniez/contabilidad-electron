import sqlite3 from "sqlite3";
const sql3 = sqlite3.verbose();
 

const DB = new sql3.Database('./mydata.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, connected);

function connected(err: Error | null) {
  if(err){
    console.log("Error al conectar:" + err.message);
    return;
  }
  console.log("Se conectó o se creó la base de datos")
}

export { DB }
