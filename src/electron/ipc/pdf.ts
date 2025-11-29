import { ipcMain, shell } from "electron"
import path from "path";
import { generateTicketPDF } from "./generatePdf/ticket.js";
import { Ticket } from "../../types/models/ticket.js";

export default function setupPdfIPC() {

  ipcMain.handle('pdf:createTicket', async (event, isTicket: boolean, ticket: Ticket): Promise<{ok: boolean, data: string}> => {
    try {
      var pdfPath = await generateTicketPDF(true, ticket);

      return {ok: true, data: pdfPath};
    } catch(err) {
      console.log("Error al generar el PDF: " + err)
      return {ok: false, data: ''}
    }
  })

  ipcMain.handle('pdf:open', async (event, pdfPath) => {
    try {
      const resolved = path.resolve(pdfPath);
      await shell.openPath(resolved);   
      return { ok: true };
    } catch (error) {
      console.log("Error al abrir el PDF: " + error)
      return { ok: false, error: error };
    }
  });

}
