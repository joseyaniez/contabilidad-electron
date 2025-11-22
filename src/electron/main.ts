import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import setupProductsIPC from './ipc/products.js';
import setupClientsIPC from './ipc/clients.js';

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

  setupProductsIPC();
  setupClientsIPC();
});
