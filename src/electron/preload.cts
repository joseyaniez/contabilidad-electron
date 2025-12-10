const electron = require('electron');

import type { Product } from '../types/models/product';
import type { Client } from '../types/models/client';
import { Invoice } from '../types/models/invoice';
import { Ticket } from '../types/models/ticket';
import cancellation from './db/models/cancellation';
import { Cancellation } from '../types/models/cancellation';
import { DateState } from '../types/util';

electron.contextBridge.exposeInMainWorld("electronAPI", {
  products: {
    create: async (product: Product) => {
      return await electron.ipcRenderer.invoke("products:create", product);
    },
    getAll: async() => {
      return await electron.ipcRenderer.invoke("products:getAll");
    },
    delete: async(id: number) => {
      return await electron.ipcRenderer.invoke("products:delete", id);
    },
    update: async(product: Product) => {
      return await electron.ipcRenderer.invoke("products:update", product);
    },
    find: async (searchTerm: string) => {
      return await electron.ipcRenderer.invoke("products:find", searchTerm);
    },
  },
  clients: {
    create: async (client: Client) => {
      return await electron.ipcRenderer.invoke("clients:create", client);
    },
    find: async (dni: string, ruc: string, name: string, filteredRuc: boolean = false) => {
      return await electron.ipcRenderer.invoke("clients:find", dni, ruc, name, filteredRuc);
    }
  },
  tickets: {
    create: async (ticket: Ticket) => {
      return await electron.ipcRenderer.invoke("tickets:create", ticket);
    },
    get: async (serie: string, ticketNumber: string) => {
      let { success, data } = await electron.ipcRenderer.invoke("tickets:get", serie, ticketNumber);
      if(success){
        return data;
      } else {
        return ''
      }
    },
    getAll: async (dateState: DateState) => {
      let { success, data } = await electron.ipcRenderer.invoke("tickets:getAll", dateState);
      if(success){
        return data;
      } else {
        return [];
      }
    },
    getNumber: async(serie: string) => {
      return await electron.ipcRenderer.invoke("tickets:getNumber", serie);
    },
    getBetween: async (initialDate: string, finalDate: string) => {
      return await electron.ipcRenderer.invoke("tickets:getBetween", initialDate, finalDate);
    }
  },
  invoices: {
    create: async (invoice: Invoice) => {
      return await electron.ipcRenderer.invoke("invoices:create", invoice);
    },
    get: async (serie: string, invoiceNumber: string) => {
      let { success, data } = await electron.ipcRenderer.invoke("invoices:get", serie, invoiceNumber);
      if(success){
        return data;
      } else {
        return ''
      }
    },
    getAll: async (dateState: DateState) => {
      let { success, data } = await electron.ipcRenderer.invoke("invoices:getAll", dateState);
      if(success){
        return data;
      } else {
        return [];
      }
    },
    getNumber: async (serie: string) => {
      return await electron.ipcRenderer.invoke("invoices:getNumber", serie);
    },
    getBetween: async (initialDate: string, finalDate: string) => {
      return await electron.ipcRenderer.invoke("invoices:getBetween", initialDate, finalDate);
    }
  },
  cancellations: {
    create: async (cancellation: Cancellation) => {
      return electron.ipcRenderer.invoke("cancellations:create", cancellation);
    }
  },
  pdf: {
    generateTicket: async(isTicket: boolean, ticket: Ticket) => {
      return await electron.ipcRenderer.invoke("pdf:createTicket", isTicket, ticket);
    },
    generateInvoice: async (isTicket: boolean, invoice: Invoice) => {
      console.log(invoice.serie)
      console.log(JSON.stringify(invoice.serie))
      return await electron.ipcRenderer.invoke("pdf:createInvoice", true, invoice);
    },
    openPdf: async (pdfPath: string) => {
      return await electron.ipcRenderer.invoke("pdf:open", pdfPath);
    }
  }
});
