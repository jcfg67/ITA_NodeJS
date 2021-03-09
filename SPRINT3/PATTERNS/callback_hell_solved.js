const {
  readdir,
  readFile,
  writeFile,
} = require("fs");
const {
  join
} = require("path");
const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
  str
  .split("")
  .reverse()
  .join("");

// Read and reverse contents of text files in a directory
readdir(inbox, dirContent);

function dirContent(error, files) {
  if (error) return console.log("Error: Folder inaccessible");
  files.forEach(file => readEachFile(file));
}

function readEachFile(file) {
  readFile(join(inbox, file), "utf8", fileContent);

  function fileContent(error, data) {
    if (error) return console.log("Error: File error");
    writeFile(join(outbox, file), reverseText(data), writeError);
  }

  function writeError(error) {
    if (error) return console.log("Error: File could not be saved!");
    console.log(`${file} was successfully saved in the outbox!`)
  }
}
