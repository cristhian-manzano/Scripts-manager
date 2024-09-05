const { exec } = require('child_process');

class ScriptExecutor {
  static run(filePath) {
    return new Promise((resolve, reject) => {
      exec(`bash ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          resolve(`Error: ${stderr}`);
        } else {
          resolve(`Output: ${stdout}`);
        }
      });
    });
  }
}

module.exports = ScriptExecutor;
