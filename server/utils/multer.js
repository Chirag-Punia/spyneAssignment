// utils/multer.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // specify the folder where files will be uploaded
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // give each file a unique name
    }
});

// Set up file filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // allow image files
    } else {
        cb(new Error("Invalid file type, only images are allowed!"), false); // reject non-image files
    }
};

// Initialize multer with storage, fileFilter, and size limits
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

module.exports = { upload }; // Export the upload object for use in routes
