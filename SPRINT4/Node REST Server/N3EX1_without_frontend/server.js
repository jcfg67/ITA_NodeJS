const express = require('express');
const multer = require('multer');

const helpers = require('./helpers');

const app = express();

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

app.post('/upload', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).any();

    upload(req, res, function(err) {
        console.log('Req: ', req.files)
        if (req.files == undefined) {
            return res.status(400).send({
                status: false,
                message: 'Error. Check body request. POST is used for submitting data and data is submitted via form data'
            })
        }
        if (req.fileValidationError) {
            return res.status(400).send({
                status: false,
                message: req.fileValidationError
            })
        }
        else if (req.files.length == 0) {
            return res.status(400).send({
                status: false,
                message: 'Please select an image to upload'
            })
        }
        else if (err instanceof multer.MulterError) {
            return res.status(500).send({
                status: false,
                message: err
            })
        }
        else if (err) {
            return res.status(500).send({
                status: false,
                message: err
            })
        }

        res.status(200).send({
            status: true,
            message: `You have uploaded this image: ${req.files[0].originalname}`
        })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}...`));
