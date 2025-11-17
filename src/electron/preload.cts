const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
  example: () => console.log('static'),
});
