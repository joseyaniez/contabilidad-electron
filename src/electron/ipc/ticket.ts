
import { ipcMain } from "electron";
import dbTicket from '../db/models/ticket.js'
import { TicketItem } from "../../types/models/ticketItem.js";
import { Ticket } from "../../types/models/ticket.js";

export default function setupTicketsIPC(){

  dbTicket.createTicketTable();

  ipcMain.handle("tickets:create", async (event, ticket: Ticket, ticketItems: Array<TicketItem>) => {
    try {
      const id = dbTicket.saveTicket(ticket.serie, ticket.number, ticket.date, ticket.client.id, ticketItems);
      return { success: true, data: id };
    } catch(err){
      if (err instanceof Error) {
          return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  })

}
