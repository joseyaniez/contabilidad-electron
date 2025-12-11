import { app } from "electron";
import path from "path";
import fs from "fs";

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getPDFTicketFolder(): string {
  const base = path.join(app.getPath("userData"), "pdfs", "tickets");
  fs.mkdirSync(base, { recursive: true });
  return base;
}

export function getPDFInvoiceFolder(): string {
  const base = path.join(app.getPath("userData"), "pdfs", "tickets");
  fs.mkdirSync(base, { recursive: true });
  return base;
}
