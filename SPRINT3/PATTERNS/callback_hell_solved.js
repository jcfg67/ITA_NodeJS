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

// Read and reverse contents of text files in a directory
readdirProm(inbox)
  .then(files => files.forEach(file => {
    readFileProm(join(inbox, file), "utf8")
      .catch(() => console.log("Error: File error"))
      .then(data => writeFileProm(join(outbox, file), reverseText(data)))
      .then(() => console.log(`${file} was successfully saved in the outbox!`))
      .catch(() => console.log("Error: File could not be saved!"))
  }))
  .catch(() => console.log("Error: Folder inaccessible"));

