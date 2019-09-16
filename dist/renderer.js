const { ipcRenderer } = require('electron');

ipcRenderer.on('load-contents', (event, data) => {
  const editor = document.getElementById('editor');
  if (editor) {
    editor.value = data;
  }
  // TODO: handle error
})
