import type { Product } from "./models/product"
import type { Client } from "./models/client"
import type { Ticket } from "./models/ticket";
import type { TicketItem } from "./models/ticketItem";
import type { Invoice } from "./models/invoice";

export type resourceResponse<T> = {success: boolean; error?: string; data?: T};

export interface IElectronAPI {
  products: {
    create: (product: Product) => Promise<resourceResponse<number>>,
    getAll: () => Promise<resourceResponse<Array<Product>>>,
    delete: (id: string) => Promise<resourceResponse<void>>,
    update: (product: Product) => Promise<resourceResponse<void>>,
    find: (searchTerm: string) => Promise<resourceResponse<Array<Product>>>,
  },
  clients: {
    create: (client: Client) => Promise<resourceResponse<Client>>,
    find: (dni: string, ruc: string, name: string) => Promise<resourceResponse<Array<Client>>>,
  },
  tickets: {
    create: (ticket: Ticket) => Promise<number>,
    get: (serie: string, numberTicket: string) => Promise<Ticket>,
    getNumber: (serie: string) => Promise<resourceResponse<number>>,
  },
  invoices: {
    create: (invoice: Invoice) => Promise<number>,
    get: (serie: string, numberInvoice: string) => Promise<Invoice>,
    getNumber: (serie: string) => Promise<resourceResponse<number>>,
  }
  pdf: {
    generateTicket: (isTicket: boolean, ticket: Ticket) => Promise<{ok: boolean, data: string}>
    openPdf: (pdfPath: string) => Promise<{ok: boolean, data: string}>
  }
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
