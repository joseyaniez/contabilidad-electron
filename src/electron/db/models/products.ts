import { Product } from "../../../types/models/product.js";
import { DB } from "../connection.js";

function createProductsTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      unit TEXT NOT NULL,
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
function saveProduct(description: string, unit: string, price: number, stock: number): Promise<number> {
  const sql = `
    INSERT INTO products (description, unit, price, stock)
    VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    DB.run(sql, [description, unit, price, stock], function (err) {
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

function deleteProduct(id: string): Promise<void> {
  const sql = `
    DELETE FROM products WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    DB.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function updateProduct(id: string, description: string, unit: string, price: number, stock: number): Promise<void> {
  const sql = `
    UPDATE products
    SET description = ?, unit = ?, price = ?, stock = ?
    WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    DB.run(sql, [description, unit, price, stock, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export { createProductsTable, saveProduct, getAllProducts, deleteProduct, updateProduct };
