const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  imageKey: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  timeStamp: { type: Date, required: true },
});

const ImageModel = mongoose.model("Image", ImageSchema, "image");
module.exports = ImageModel;
