// WITH exec AND async

const os = require('os');
const { exec } = require('child_process');
const util = require('util');

const execProm = util.promisify(exec);
const system = os.type();
const folder = os.homedir();

let readCommand;

switch (system){
    case ('Linux') :
        readCommand = `ls ${folder}`;
        break;
    case 'Darwin':
        readCommand = `ls ${folder}`;
        break;
    case 'Windows_NT':
        readCommand = `dir ${folder}`;
        break;
    default:
        return console.log('OS read directory function not implemented');
}

async function readUserDir() {
    try {
        const { stdout, stderr } = await execProm(readCommand);     // An error in execProm throws an " UnhandledPromiseRejectionWarning " if not catched with a try...catch statement
        console.log(stdout);
    }
    catch(error) {
        console.error(`exec error --> ${error.stderr}`)
    }
}

readUserDir();


