const multer = require("multer");
const path = require("path");
const tempDir = path.join(process.cwd(), "temp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000,
  },
});

const uploadMiddleware = multer({
  storage: storage,
});

module.exports = uploadMiddleware;
