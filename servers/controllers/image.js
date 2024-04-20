const ImageModel = require("../models/image");
const { uploadFile, getFileStream } = require("../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

module.exports.UPLOAD = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const { uuid } = req.body;
    console.log(req.body);
    const file = req.file;
    console.log(uuid, "File upload", file);
    const response = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(response);

    const image = new ImageModel({
      uuid,
      imageKey: response.Key,
      timeStamp: new Date(),
      isVerified: false,
    });

    const responseSave = await image.save();
    console.log(responseSave);
    // File was uploaded successfully
    res.json({ message: "File uploaded successfully." });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "something went wrong while uploading image" });
  }
};

module.exports.GET_IMAGE = async (req, res) => {
  try {
    const { key } = req.params;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (e) {
    console.log("Issue while retrieving images", e);
  }
};

module.exports.GET_IMAGES = async (req, res) => {
  try {
    console.log("Made request for image codes");
    const { page } = req.params;
  
    if (!page || page < 1)
      return res.status(500).json({ message: "Innapropriate page number" });
    const images = await ImageModel.find()
      .skip(9 * (page - 1))
      .limit(9);
    if (!images.length)
      return res.status(500).json({ message: "No images on this page" });
    return res.json({ action: "images", payload: JSON.stringify(images) });
  
  }
  catch(e) {
    console.log("Something went wrong while retrieving images", e);
    return res.status(500).json({message:"Something went wrong while retrieving images"});
  }
};

module.exports.GET_BY_USER_IMAGES = async (req, res) => {
  try {
    const {uuid, page} = req.params;
    console.log("Made request for personal image codes");
    if (!page || page < 1)
      return res.status(500).json({ message: "Innapropriate page number" });
    const images = await ImageModel.find({uuid})
      .skip(9 * (page - 1))
      .limit(9);
    if (!images.length)
      return res.status(500).json({ message: "No images on this page" });
    return res.json({ action: "images", payload: JSON.stringify(images) });
  }
  catch(e) {
    console.log("Something went wrong while retrieving user images", e);
    return res.status(500).json({message:"Something went wrong while retrieving user images"});
  }
}