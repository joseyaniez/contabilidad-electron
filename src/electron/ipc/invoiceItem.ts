import dbInvoiceItem from '../db/models/invoiceItem.js';

export default function setupInvoiceItemsIPC(){
  dbInvoiceItem.createTicketItemTable();
}
