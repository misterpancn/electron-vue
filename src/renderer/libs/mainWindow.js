import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
export default function main (callbacks) {
  const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${require('path').join(__dirname, '/index.html')}`
  /**
   * Initial window options
   */
    // let exit = false
  let mainWindow = new BrowserWindow({
    height: 563,
    // useContentSize: true,
    width: 1000,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    }
  })

  // mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
    // exit = false
  })
  mainWindow.on('focus', () => mainWindow.flashFrame(false))
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('close', (e) => {
    // exit = true
    app.quit()
  })
  let appTray = null
  if (process.platform === 'win32') {
    // Set tray ICONS and menus
    const trayMenuTemplate = [
      {
        label: 'open',
        click: () => {
          mainWindow.show()
        }
      },
      {
        label: 'exit',
        click: () => {
          app.quit()
        }
      }
    ]
    // System Tray icon
    const trayIco = require('path').join(__dirname, '/static/img/icons/icon.ico')
    appTray = process.env.NODE_ENV === 'development' ? new Tray('build/icons/icon.ico') : new Tray(trayIco)
    // Context menu for the icon
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // Sets the hover prompt for this tray icon
    appTray.setToolTip('chat')
    // Sets the context menu for this icon
    appTray.setContextMenu(contextMenu)
    // Click the small icon in the lower right corner to display the application left button
    appTray.on('click', function () {
      mainWindow.show()
    })
    // Right click
    appTray.on('right-click', () => {
      appTray.popUpContextMenu(trayMenuTemplate)
    })
  }
  const { session } = require('electron')

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const c = {
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' data:']
      }
    }
    callback(c)
  })
  ipcMain.on('exit', (e) => {
    mainWindow.close()
  })
  return mainWindow
}
