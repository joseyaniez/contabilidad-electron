
import { ipcMain } from "electron";
import { createProductsTable, saveProduct, getAllProducts } from "../db/models/products.js";

export default function setupProductsIPC(){
  createProductsTable();

  ipcMain.handle("products:create", async (event, product) => {
      const { description, price, stock } = product;
      try {
          const id = await saveProduct(description, price, stock);
          return { success: true, data: id };
      } catch (error) {
          if (error instanceof Error) {
              return { success: false, error: error.message };
          }
          return { success: false, error: "Unknown error" };
      }
  });

  ipcMain.handle("products:getAll", async (event) => {
      try {
          const products = await getAllProducts();
          return { success: true, data: products };
      } catch (error) {
          if (error instanceof Error) {
              return { success: false, error: error.message };
          }
          return { success: false, error: "Unknown error" };
      }
  });

}
