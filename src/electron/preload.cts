const electron = require('electron');

import type { Product } from '../types/models/product';
import type { Client } from '../types/models/client';

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
    }
  },
  clients: {
    create: async (client: Client) => {
      return await electron.ipcRenderer.invoke("clients:create", client);
    },
    find: async (dni: string, ruc: string, name: string) => {
      return await electron.ipcRenderer.invoke("clients:find", dni, ruc, name);
    }
  }
});
