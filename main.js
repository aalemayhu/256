const fs = require('fs');
const { 
  app, BrowserWindow, globalShortcut, dialog, ipcMain 
} = require("electron")

const SHORTCUTS = {
  OPEN_FILE: 'CommandOrControl+O',
  SAVE_FILE: 'CommandOrControl+S'
};

// TODO: clean up this file

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
  globalShortcut.register(SHORTCUTS.OPEN_FILE, async () => {
    try {
      const result = await dialog.showOpenDialog({properties: ['openFile']});
      if (result && !result.canceled) {
        const filePath = result.filePaths[0];
        const contents = fs.readFileSync(filePath);
        const payload = contents.toString();
        win.webContents.send('load-contents', payload);
        return;
      } 
    } catch (error) { console.error(error); }
    // TODO: show error message, file could not be opened.
  });
  globalShortcut.register(SHORTCUTS.SAVE_FILE, async () => {
    const result = await dialog.showSaveDialog(null);
    if (result && !result.canceled) {
      const {filePath} = result;
      // TODO: retrieve editor contents
      console.log('save path', filePath);
      return;
    }
    // TODO: error
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
