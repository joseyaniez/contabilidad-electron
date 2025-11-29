import { ipcMain } from "electron"
import PDFDocument from 'pdfkit'
import fs from 'fs'
import { getPDFInvoiceFolder, getPDFTicketFolder } from "../util.js"
import path from "path";
import { generateTicketPDF } from "./generatePdf/ticket.js";

export default function setupPdfIPC() {

  ipcMain.handle('pdf:createTicket', async (event, isTicket: boolean, pdfName: string): Promise<{ok: boolean, data: string}> => {
    try {
      const pdfFolderPath = isTicket ? getPDFTicketFolder() : getPDFInvoiceFolder();
      const pdfPath = path.join(pdfFolderPath, pdfName);

      await generateTicketPDF(true, "ejemplo.pdf");

      return {ok: true, data: pdfPath};
    } catch(err) {
      console.log("Error al generar el PDF: " + err)
      return {ok: false, data: ''}
    }
  })

}
