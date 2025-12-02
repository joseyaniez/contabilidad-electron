
import { ipcMain } from "electron";
import dbTicket from '../db/models/ticket.js'
import { Ticket } from "../../types/models/ticket.js";

export default function setupTicketsIPC(){

  dbTicket.createTicketTable();

  ipcMain.handle("tickets:create", async (event, ticket: Ticket) => {
    try {
      const id = await dbTicket.saveTicket(ticket.serie, ticket.number, ticket.dateString, ticket.client.id!, ticket.productsList);
      return { success: true, data: id };
    } catch(err){
      if (err instanceof Error) {
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("tickets:get", async (event, serie: string, ticketNumber: string) => {
    try {
      const ticket = await dbTicket.getCompleteTicket(serie, ticketNumber);
      return { success: true, data: ticket }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

  ipcMain.handle("tickets:getNumber", async (event, serie: string) => {
    try {
      const num = await dbTicket.getTicketNumber(serie);
      return { success: true, data: num }
    } catch(err){
      if(err instanceof Error){
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

}
