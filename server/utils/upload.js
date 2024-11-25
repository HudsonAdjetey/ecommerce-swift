const multer = require("multer");
const fs = require("fs");

// Create storage directory if it doesn't exist
const dirPath = "../uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Creating directory");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // only images
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, dirPath);
    } else {
      return cb(new Error("Invalid file type"), false);
    }
  },
}).single("file");
