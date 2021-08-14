'use strict'

import {app, BrowserWindow} from 'electron'
import mainWin from '../renderer/lib/window/mainWindow'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let downloadItems = []
function init () {
  mainWindow = mainWin(downloadItem)
  // chatImgWin(mainWindow)
}

app.on('ready', init)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    init()
  }
})

function downloadItem (item) {
  if (item.type === 'add') {
    if (item.downloadUrl.indexOf('?') !== -1) {
      item.downloadUrl = item.downloadUrl.split('?')[0];
    }
    downloadItems.push(item)
  }
  if (item.type === 'remove') {
    downloadItems = []
  }
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
