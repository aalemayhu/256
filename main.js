let { app, BrowserWindow, globalShortcut } = require("electron")

const SHORTCUTS = {
  OPEN_FILE: 'CommandOrControl+O',
  SAVE_FILE: 'CommandOrControl+S'
};

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  })
  win.maximize()
  win.show()
  if (app.isPackaged || process.env.PRODUCTION) {
    // and load the index.html of the app.
    win.loadFile("dist/index.html")
  } else {
    // webpack-dev-server defaults to port 8080
    const port = process.env.PORT || 8080;
    win.loadURL(`http://localhost:${port}`)
  }

  // Add the shortcut(s)
  globalShortcut.register(SHORTCUTS.OPEN_FILE, () => {
    // TODO: show dialog for opening file
    console.log('pressed CMD+O');
  });
  globalShortcut.register(SHORTCUTS.SAVE_FILE, () => {
    // TODO: save file
    console.log('pressed CMD+S');
  });
}

app.on("ready", createWindow)

// Make OSX work same as all other systems
app.on("window-all-closed", () => {
  app.quit()
})

app.on("activate", () => {
  // On macOS it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

global.sharedObject = {argv: process.argv}
