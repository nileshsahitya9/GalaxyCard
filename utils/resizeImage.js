const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

exports.Resizer = async (req, res, next) => {
    const { filename: image } = req.file;
    await sharp(req.file.path)
        .resize(200, 200)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(__dirname, 'resized', image))
    fs.unlinkSync(req.file.path);
    req.file.path = path.resolve(__dirname, 'resized', image);
    next();

}