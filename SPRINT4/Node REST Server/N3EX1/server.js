const express = require('express');
const multer = require('multer');
const path = require('path');

const helpers = require('./helpers');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

app.post('/upload', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('picture');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(`${req.fileValidationError} <br><a href='/'>Back</a>`);
        }
        else if (!req.file) {
            return res.send(`Please select an image to upload <br><a href='/'>Back</a>`);
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.send(`You have uploaded this image: "${req.file.originalname}"<hr /><a href="./">Upload another image</a>`);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}...`));
