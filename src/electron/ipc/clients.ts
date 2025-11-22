
import { ipcMain } from "electron";
import dbClient from "../db/models/clients.js";

export default function setupClientsIPC(){

  dbClient.createClientsTable();

  ipcMain.handle("clients:create", async (event, client) => {
    const { dni, ruc, name } = client;
    try {
      const id = await dbClient.saveClient(dni, ruc, name);
      return { success: true, data: client };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Unknown error" };
    }
  });

  ipcMain.handle("clients:find", async (event, dni: string, ruc: string, name: string) => {
    try {
      const clients = await dbClient.findClients(dni, ruc, name);
      return { success: true, data: clients };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Unknown error" };
    }
  });
}
