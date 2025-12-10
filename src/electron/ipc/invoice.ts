
import { ipcMain } from "electron";
import dbInvoice from '../db/models/invoice.js'
import { Ticket } from "../../types/models/ticket.js";
import { Invoice } from "../../types/models/invoice.js";
import { DateState } from "../../types/util.js";

export default function setupInvoicesIPC(){

  dbInvoice.createInvoiceTable();

  ipcMain.handle("invoices:create", async (event, invoice: Invoice) => {
    try {
      const id = await dbInvoice.saveInvoice(invoice.serie, invoice.number, invoice.dateString, invoice.client.id!, invoice.productsList);
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

  ipcMain.handle("invoices:getBetween", async (event, initialDate: string, finalDate: string) => {
    try {
      const invoices = await dbInvoice.getInvoicesBetween(initialDate, finalDate);
      return { success: true, data: invoices }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("invoices:getAll", async (event, dateState: DateState) => {
    try {
      const invoices = await dbInvoice.getCompleteInvoices(dateState);
      return { success: true, data: invoices }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("invoices:getNumber", async (event, serie: string) => {
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
