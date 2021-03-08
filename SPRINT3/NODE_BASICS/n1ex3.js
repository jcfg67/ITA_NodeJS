const fs = require('fs');

const fileToRead = 'file_with_function_name.txt'

fs.readFile(fileToRead, 'utf8', (err, data) => {
  if (err) return console.log('Error: File not found --> File n1ex2.js must be executed first !');
  console.log(data);
});

