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
