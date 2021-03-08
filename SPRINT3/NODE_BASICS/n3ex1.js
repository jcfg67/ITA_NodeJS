// WITH spawn

const os = require('os');
const { spawn } = require('child_process');

const system = os.type();
const folder = os.homedir();
let readCommand;

switch (system){
    case ('Linux') :
        readCommand = 'ls';
        break;
    case 'Darwin':
        readCommand = 'ls';
        break;
    case 'Windows_NT':
        readCommand = 'dir';
        break;
    default:
        return console.log('OS read directory function not implemented');
}

const subprocess = spawn(readCommand, [folder], { shell: true });

subprocess.on('error', (err) => {
  console.error('Failed to start subprocess.');
});

subprocess.stdout.on('data', (data) => {
  console.log(data.toString());
});

subprocess.stderr.on('data', (data) => {
  console.error(data.toString());
});


