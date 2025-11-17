import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

app.on("ready", () => {
  const mainwindow = new BrowserWindow({});
  if(isDev()){
    mainwindow.loadURL('http://localhost:5123');
  } else {
    mainwindow.loadFile(path.join(app.getAppPath(), "/dist-svelte/index.html"));
  }
});
