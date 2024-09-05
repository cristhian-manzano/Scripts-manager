const { ipcRenderer } = require('electron');

let scripts = [];

// Load scripts from local storage on window load
window.onload = function () {
  const savedScripts = localStorage.getItem('bash-scripts');
  if (savedScripts) {
    try {
      scripts = JSON.parse(savedScripts);
      if (scripts && Array.isArray(scripts)) {
        renderScripts();
      }
    } catch (e) {
      console.error('Failed to parse scripts from localStorage', e);
      scripts = [];
    }
  }
};

// Trigger file explorer from renderer
function chooseFile() {
  ipcRenderer.send('open-file-dialog'); // Ask main process to open file explorer
}

// Receive the script info back from the main process and render it
ipcRenderer.on('script-added', (event, scriptInfo) => {
  if (scriptInfo && scriptInfo.name && scriptInfo.path) {
    scriptInfo.lastExecuted = 'Never'; // Set the initial "lastExecuted" value to "Never"
    scripts.push(scriptInfo);
    localStorage.setItem('bash-scripts', JSON.stringify(scripts));
    renderScripts();
  }
});

// Render the list of scripts with delete and lastExecuted functionality
function renderScripts() {
  const scriptsList = document.getElementById('scripts-list');
  scriptsList.innerHTML = ''; // Clear the existing content

  scripts.forEach((script, index) => {
    if (script && script.name && script.path) {
      const row = document.createElement('tr');

      // Script Name Column
      const nameCell = document.createElement('td');
      nameCell.textContent = script.name;
      row.appendChild(nameCell);

      // Script Path Column
      const pathCell = document.createElement('td');
      pathCell.textContent = script.path;
      row.appendChild(pathCell);

      // Last Executed Column
      const lastExecutedCell = document.createElement('td');
      lastExecutedCell.textContent = script.lastExecuted || 'Never';
      row.appendChild(lastExecutedCell);

      // Action Column
      const actionCell = document.createElement('td');
      const playButton = document.createElement('button');
      playButton.textContent = 'Play';
      playButton.className = 'play-button';
      playButton.onclick = () => runScript(script.name, script.path, index); // Pass index to update lastExecuted
      actionCell.appendChild(playButton);
      row.appendChild(actionCell);

      // Delete Column
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.onclick = () => deleteScript(index);
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      scriptsList.appendChild(row);
    }
  });
}

// Run the selected script, update the last executed time, and show the loader
function runScript(scriptName, scriptPath, scriptIndex) {
  const loaderOverlay = document.getElementById('loader-overlay');
  const scriptNameElement = document.getElementById('loader-script-name');

  scriptNameElement.textContent = scriptName;
  loaderOverlay.style.display = 'flex'; // Show loader as a card in front

  // Update last executed time
  const now = new Date().toLocaleString(); // Format the current date and time
  scripts[scriptIndex].lastExecuted = now;
  localStorage.setItem('bash-scripts', JSON.stringify(scripts));
  renderScripts(); // Re-render to update the "Last Executed" column

  ipcRenderer.send('run-script', scriptPath);
}

// Receive script output and hide loader
ipcRenderer.on('script-output', (event, output) => {
  const outputElement = document.getElementById('output');
  outputElement.textContent = output;

  const loaderOverlay = document.getElementById('loader-overlay');
  loaderOverlay.style.display = 'none'; // Hide loader once script execution is complete
});

// Delete a script by its index and update localStorage
function deleteScript(index) {
  scripts.splice(index, 1); // Remove the script from the array
  localStorage.setItem('bash-scripts', JSON.stringify(scripts)); // Update localStorage
  renderScripts(); // Re-render the list
}
