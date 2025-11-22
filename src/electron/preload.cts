const electron = require('electron');

import type { Product } from '../types/models/product';

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
  }
});
