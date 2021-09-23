/*
 * @Date: 2021-09-10 16:46:59
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-23 20:30:32
 * @Description: 
 */
const {
  app,
  BrowserWindow
} = require('electron');
require('@electron/remote/main').initialize();

const log = require('electron-log');
const path = require('path');
const isDev = require('electron-is-dev');
log.info("the main thread is running");
log.info(app.getAppPath())

function createWindow() {
  const mainWin = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  mainWin.loadURL(
    isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    mainWin.webContents.openDevTools({
      mode: 'detach'
    });
  }
}

app.whenReady().then(() => {
  createWindow();
})