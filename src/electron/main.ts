import path from 'path';

import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import { DB } from './db/connection.js';
import { getPreloadPath } from './pathResolver.js';

import setupProductsIPC from './ipc/products.js';
import setupClientsIPC from './ipc/clients.js';
import setupTicketsIPC from './ipc/ticket.js';
import setupTicketItemsIPC from './ipc/ticketItem.js';
import setupPdfIPC from './ipc/pdf.js';

app.on("ready", () => {
  const mainwindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });
  if(isDev()){
    mainwindow.loadURL('http://localhost:5123');
  } else {
    mainwindow.loadFile(path.join(app.getAppPath(), "/dist-svelte/index.html"));
  }

  DB.run("PRAGMA foreign_keys = ON");
  setupProductsIPC();
  setupClientsIPC();
  setupTicketsIPC();
  setupTicketItemsIPC();
  setupPdfIPC();

});
