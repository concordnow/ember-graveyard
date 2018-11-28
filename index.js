'use strict';
const path = require('path');
const { execSync, execFileSync } = require('child_process');

module.exports = {
  name: require('./package').name,
  includedCommands: function() {
    return {
      graveyardCommand: {
        name: 'graveyard',
        description: 'A command that find dead code in your app',
        availableOptions: [
          { name: 'cleanup', type: Boolean, default: false, aliases: ['c'] }
        ],
        run: function(commandOptions, rawArgs) {

          let dead_components_sh = path.resolve(__dirname, 'dead_components.sh');
          let stdout = execFileSync(dead_components_sh, {
            cwd: path.resolve(this.project.root, 'app'),
            stdio: ['pipe', 'pipe', 'inherit']
          }).toString();
          let dead_components = stdout.split(/\r?\n/).filter((e) => !!(e.trim()));
          if (commandOptions.cleanup && dead_components.length) {
            dead_components.forEach((component) => {
              execSync(`ember destroy component ${component}`, {
                cwd: path.resolve(this.project.root),
                stdio: 'inherit'
              });
            });
          }
        }
      }
    }
  }
};
