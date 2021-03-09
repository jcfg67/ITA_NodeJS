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

const readReverseWriteFile = async() => {
  try {
    const files = await readdirProm(inbox);
    files.forEach( async(file) => {
      try {
        const data = await readFileProm(join(inbox, file), "utf8");
        try {
          await writeFileProm(join(outbox, file), reverseText(data));
          console.log(`${file} was successfully saved in the outbox!`)
        }
        catch(error) {
          console.log("Error: File could not be saved!")
        }
      }
      catch {
        console.log("Error: File error")
      }
    })
  }
  catch(error) {
    console.log("Error: Folder inaccessible")
  }
}

readReverseWriteFile();
