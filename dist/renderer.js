const { ipcRenderer } = require('electron');

ipcRenderer.on('read-file', (event, data) => {
  const editor = document.getElementById('editor');
  if (editor) {
    editor.value = data;
  }
  // TODO: handle error
})
