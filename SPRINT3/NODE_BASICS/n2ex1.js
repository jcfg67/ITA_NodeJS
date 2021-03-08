const zlib = require('zlib');
const fs = require('fs');

const fileToRead = 'file_with_function_name.txt';
const fileToZip = `${fileToRead}.gz`;

let zip = zlib.createGzip();

fs.access(fileToRead, fs.R_OK, (err) => {
    if (err) {
        console.error(`Error: File not found --> File n1ex2.js must be executed first !!`)
        return
    }
    const read = fs.createReadStream(fileToRead);
    const write = fs.createWriteStream(fileToZip);
    read.pipe(zip).pipe(write);	
    console.log(`"file_with_function_name.txt" --> Successfully zipped !!`)
})


