// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')
let mainWindow
let appTray = null
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.icns')
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const trayMenuTemplate = [
    {
      label: '显示主面板',
      click () {
        mainWindow.show()
      }
    },
    {
      label: '隐藏主面板',
      click () {
        mainWindow.hide()
      }
    },
    {
      label: '退出',
      click: function () {
        app.quit()
        app.quit()
      }
    }
  ]
  appTray = new Tray(path.join(__dirname, './icon/ico.png'))
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  appTray.setToolTip('图片上传服务')
  appTray.setContextMenu(contextMenu)
  appTray.on('click', () => {
    mainWindow.show()
  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}

app.whenReady().then(() => {
  createWindow()
})
app.dock.hide()
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

module.exports = 'gui'
