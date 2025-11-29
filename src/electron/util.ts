import { app } from "electron";
import path from "path";

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getPDFTicketFolder(): string {
  return path.join(app.getAppPath(), 'pdfs', 'tickets');
}

export function getPDFInvoiceFolder(): string {
  return path.join(app.getAppPath(), 'pdfs', 'invoices');
}
