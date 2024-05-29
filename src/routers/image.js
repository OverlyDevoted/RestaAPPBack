const express = require("express");
const {
  UPLOAD,
  GET_IMAGE,
  GET_IMAGES,
  GET_BY_USER_IMAGES,
} = require("../controllers/image");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

const imageRouter = new express.Router();
imageRouter.post("/image", upload.single("image"), UPLOAD);
imageRouter.get("/download/:key", GET_IMAGE);
imageRouter.get("/image/:page", GET_IMAGES);
imageRouter.get("/image/:uuid/:page", GET_BY_USER_IMAGES);
module.exports = imageRouter;
