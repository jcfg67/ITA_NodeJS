const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(png|PNG|jpg|JPG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files with png, jpg or gif extensions are allowed!';
        return cb(new Error('Only image files with png, jpg or gif extensions are allowed!'), false);
    }
    cb(null, true);
};

exports.imageFilter = imageFilter;