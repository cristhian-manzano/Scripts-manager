// src/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const ScriptExecutor = require('./src/backend/services/ScriptExecutor');
const { dialog } = require('electron');
const config = require('./config/electron.config.js');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: config.window.width, // Use config values
    height: config.window.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('src/frontend/views/index.html');

  if (config.window.devTools) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle opening file dialog and sending the file info back to the renderer
ipcMain.on('open-file-dialog', async (event) => {
  const file = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Shell Script', extensions: ['sh'] }],
  });

  if (file && file.filePaths.length > 0) {
    const filePath = file.filePaths[0];
    const fileName = filePath.split('/').pop();
    event.sender.send('script-added', { name: fileName, path: filePath });
  }
});

// Handle script execution
ipcMain.on('run-script', async (event, filePath) => {
  const output = await ScriptExecutor.run(filePath);
  event.sender.send('script-output', output);
});
