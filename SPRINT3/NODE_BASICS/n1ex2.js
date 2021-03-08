const fs = require('fs');

const fileToWriteIn = 'file_with_function_name.txt';
const data = writeMyNameToFile.name;

function writeMyNameToFile() {
    fs.writeFile(fileToWriteIn, data, (err) => {
        if (err) return console.log(err);
        console.log('The file has been saved!');
    });
}

writeMyNameToFile();

