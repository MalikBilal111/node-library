// import the multer module before configuring it to use the disc storage engine
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/uploads");
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const fileExtension = originalFileName.split('.').pop();
    const newFileName = `${originalFileName}-${Date.now()}.${fileExtension}`;
    // cb(null, file.originalname);
    cb(null, newFileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// create the exported middleware object
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;