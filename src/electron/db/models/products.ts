import { Product } from "../../../types/models/product.js";
import { DB } from "../connection.js";

function createProductsTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0
    )
  `;

  DB.run(sql, [], (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Products table created");
  });
}

// HAZLO async envolviéndolo en Promise
function saveProduct(description: string, price: number, stock: number): Promise<number> {
  const sql = `
    INSERT INTO products (description, price, stock)
    VALUES (?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    DB.run(sql, [description, price, stock], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
}

function getAllProducts(): Promise<Array<Product>>{
  const sql = `
    SELECT * FROM products
  `;

  return new Promise((resolve, reject) => {
    DB.all<Product>(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

export { createProductsTable, saveProduct, getAllProducts };
