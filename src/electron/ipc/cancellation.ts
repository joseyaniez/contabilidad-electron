
import { ipcMain } from "electron";
import dbCancellation from "../db/models/cancellation.js";
import { Cancellation } from "../../types/models/cancellation.js";

export default function setupCancellationIPC(){
  dbCancellation.createCancellationTable();

  ipcMain.handle("cancellation:create", async (event, cancellation: Cancellation) => {
    try {
      const id = await dbCancellation.saveCancellation(cancellation.cause, cancellation.cancellableType, cancellation.cancellableId);
    } catch (err){
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

}
