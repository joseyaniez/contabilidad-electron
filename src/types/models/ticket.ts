import type { Client } from "./client.js";
import type { TicketItem } from "./ticketItem.js";

export interface Ticket {
  id?: string,
  serie: string,
  number: number,
  dateString: string,
  client: Client,
  productsList: Array<TicketItem>
}
