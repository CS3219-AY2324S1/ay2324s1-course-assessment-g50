// cloudinary Config
const { config, uploader } = require('cloudinary')
const initializeConfigs = () => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

// Data Uri configs
const Parser = require('datauri/parser')
const path = require('path');
const parser = new Parser()
const dataUri = req => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);


// Upload image util function
async function uploadImageToServer(req, prevImgUrl) {
    console.log(req.body)
    if (!req.file) {
        throw new Error("File not selected")
    }

    // 1. Initalize config
    initializeConfigs()

    // 2. Delete current image on the server if exists
    const prevImgId = prevImgUrl.split("/").pop().split(".")[0];
    await uploader.destroy(prevImgId)

    // 3. Upload to Cloud image server
    const file = dataUri(req).content;
    const result = await uploader.upload(file)
    return result.url
}

module.exports = { uploadImageToServer }
