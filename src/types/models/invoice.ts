import type { Client } from "./client.js";
import type { InvoiceItem } from "./invoiceItem.js";

export interface Invoice {
  id?: String,
  serie: String,
  number: number,
  dateString: string,
  client: Client,
  productsList: Array<InvoiceItem>
}
