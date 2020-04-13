import { app, BrowserWindow } from 'electron'
import SettingsStore from './setting'
import MenuBuilder from './menu'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  const defaultWidth = 1320
  const defaultHeight = 800
  let settings = new SettingsStore()

  // First we'll get our height and width. This will be the defaults if there wasn't anything saved
  let width = settings.get('width')
  let height = settings.get('height')
  if (width > defaultWidth) {
    width = defaultWidth
  }
  if (height > defaultHeight) {
    height = defaultHeight
  }

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 480,
    minHeight: 600,
    resizable: true,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(winURL)

  // Build menu
  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds()
    // Now that we have them, save them using the `set` method.
    settings.set('width', width)
    settings.set('height', height)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.disableHardwareAcceleration()
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

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
