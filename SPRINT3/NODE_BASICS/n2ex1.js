// WITH async function BUT node >= v15 REQUIRED !!

const { pipeline } = require('stream/promises');
const zlib = require('zlib');
const fs = require('fs');

const fileToRead = 'file_with_function_name.txt';
const fileToZip = `${fileToRead}.gz`;

fs.access(fileToRead, fs.R_OK, (err) => {
    if (err) {
        console.error(`Error: File not found --> File n1ex2.js must be executed first !!`)
        return
    }
    run().catch((err) => console.error(err.message));
});

async function run() {
  await pipeline(
    fs.createReadStream(fileToRead),
    zlib.createGzip(),
    fs.createWriteStream(fileToZip)
  );
  console.log(`"file_with_function_name.txt" --> Successfully zipped !!`);
}


