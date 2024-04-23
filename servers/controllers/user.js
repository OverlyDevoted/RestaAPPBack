const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user");
const { validateRegister } = require("./../../js/stringUtils.js");
const ImageModel = require("../models/image.js");
const { deleteObject } = require("../s3.js");
const ScanModel = require("../models/scan.js");
module.exports.CREATE_USER = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Invalid body" });
    }

    if (validateRegister(username, email)) {
      return res
        .status(400)
        .json({ action: "registerError", message: "Netinkami duomenys." });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        action: "registerError",
        message:
          "Vartotojas jau egzistuoja, nurodykite kitą vardą arba el.paštą",
      });
    }

    const uuid = uuidv4();

    const user = new UserModel({ username, email, uuid });
    const response = await user.save();
    console.log("Adding new user", uuid);
    return res.json({ action: "register", uuid: uuid });
  } catch (e) {
    console.log(e, "Something went wrong");
    return res.status(500).json({
      action: "registerError",
      message: "Something went wrong while creating new user",
    });
  }
};
module.exports.DELETE_USER = async (req, res) => {
  try {
    const { uuid, username, email } = req.body;
    if (!uuid || !username || !email)
      return res.status(403).json({ message: "Invalid" });
    console.log(
      "Request to delete user",
      uuid,
      "was made. Checking credentials"
    );

    const response = await UserModel.findOne({ uuid, username, email });

    if (!response)
      return res
        .status(403)
        .json({ message: "Could not delete user. Incorrect credentials" });

    const images = await ImageModel.find({ uuid });

    //delete images from s3
    for (let i = 0; i < images.length; i++) {
      await deleteObject(images[i].imageKey);
    }
    console.log("Successfully deleted all images");

    await ImageModel.deleteMany({ uuid });

    console.log("Successfully deleted all user images");

    await ScanModel.deleteMany({ uuid });

    console.log("Successfully deleted all user scans");

    await UserModel.deleteOne({ uuid });

    console.log("Delete all user data");

    return res.json({ message: "User deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
