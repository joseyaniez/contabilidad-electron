import type { Client } from "./client.js";
import type { InvoiceItem } from "./invoiceItem.js";

export interface Invoice {
  id?: string,
  serie: string,
  number: number,
  dateString: string,
  client: Client,
  productsList: Array<InvoiceItem>
}

export interface GetInvoicesResponse {
  invoiceId: string,
  invoiceSerie: string,
  invoiceDate: string,
  invoiceNumber: number,
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


