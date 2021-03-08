// WITH exec AND callback

const os = require('os');
const { exec } = require('child_process');

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

exec(readCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    console.error(`stderr: ${stderr}`);         // stderr is attached too with the error object, so this line is not necessary! SEE PS at the bottom
    return
  }
  console.log(stdout);
});



// PS: In case of an error (including any error resulting in an exit code other than 0), a rejected promise is returned, with the same error object given in the callback, but with two additional properties stdout and stderr.


