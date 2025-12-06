
import { ipcMain } from "electron";
import dbInvoice from '../db/models/invoice.js'
import { Ticket } from "../../types/models/ticket.js";

export default function setupTicketsIPC(){

  dbInvoice.createInvoiceTable();

  ipcMain.handle("invoices:create", async (event, ticket: Ticket) => {
    try {
      const id = await dbInvoice.saveInvoice(ticket.serie, ticket.number, ticket.dateString, ticket.client.id!, ticket.productsList);
      return { success: true, data: id };
    } catch(err){
      if (err instanceof Error) {
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("invoices:get", async (event, serie: string, invoiceNumber: string) => {
    try {
      const invoice = await dbInvoice.getCompleteInvoice(serie, invoiceNumber);
      return { success: true, data: invoice }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("tickets:getNumber", async (event, serie: string) => {
    try {
      const num = await dbInvoice.getInvoiceNumber(serie);
      return { success: true, data: num }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

}
