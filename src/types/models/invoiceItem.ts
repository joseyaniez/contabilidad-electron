
export interface InvoiceItem {
  id?: string,
  description: string,
  unit: string,
  quantity: number,
  unitPrice: number,
  importPrice: number,
  ticketId: string
}
