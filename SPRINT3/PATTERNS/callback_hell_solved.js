const {
  readdir,
  readFile,
  writeFile,
} = require("fs");
const {
  join
} = require("path");

const {
  promisify
} = require('util');

const readdirProm = promisify(readdir);
const readFileProm = promisify(readFile);
const writeFileProm = promisify(writeFile);

const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
  str
  .split("")
  .reverse()
  .join("");

const handle = (promise) => {
  return promise
    .then(data => ([undefined, data]))
    .catch(error => ([error, undefined]));
}

const readReverseWriteFile = async () => {
  const [readDirError, files] = await handle(readdirProm(inbox));
  if (readDirError) return console.log("Error: Folder inaccessible");
  files.forEach(async(file) => {
    const [readFileError, data] = await handle(readFileProm(join(inbox, file), "utf8"));
    if (readFileError) return console.log("Error: File error");
    const [writeFileError,result] = await handle(writeFileProm(join(outbox, file), reverseText(data)));
    if (writeFileError) return console.log("Error: File could not be saved!");
    console.log(`${file} was successfully saved in the outbox!`)
  });
};

readReverseWriteFile();

