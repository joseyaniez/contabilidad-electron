import type { Client } from "./client";
import type { TicketItem } from "./ticketItem";

export interface Ticket {
  id?: string,
  serie: string,
  number: number,
  date: Date,
  client: Client,
  productsList: Array<TicketItem>
}
