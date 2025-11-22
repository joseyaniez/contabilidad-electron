
import { ipcMain } from "electron";
import { createProductsTable, saveProduct, getAllProducts, deleteProduct } from "../db/models/products.js";

export default function setupProductsIPC(){
  createProductsTable();

  ipcMain.handle("products:create", async (event, product) => {
      const { description, price, stock, unit } = product;
      try {
          const id = await saveProduct(description, unit, price, stock);
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

  ipcMain.handle("products:delete", async (event, id: string) => {
      try {
          await deleteProduct(id);
          return { success: true };
      } catch (error) {
          if (error instanceof Error) {
              return { success: false, error: error.message };
          }
          return { success: false, error: "Unknown error" };
      }
  });

}
