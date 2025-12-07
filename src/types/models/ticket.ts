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

export interface GetTicketsResponse {
  ticketId: string,
  ticketSerie: string,
  ticketDate: string,
  ticketNumber: number,
  clientId: string,
  clientName?: string,
  clientDni?: string,
  clientRuc?: string,
  clientAddress?: string
  itemId: string,
  itemDescription: string,
  itemUnit: string,
  itemQuantity: number,
  itemUnitPrice: number
  itemImportPrice: number
}


