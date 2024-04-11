const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user");
const { validateRegister } = require("./../../js/stringUtils.js");
module.exports.CREATE_USER = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "Invalid body" });
  }

  if (validateRegister(username, email)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const existingUser = await UserModel.find({ username, email });

  if (existingUser.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const uuid = uuidv4();

  const user = new UserModel({ username, email, uuid });
  const response = await user.save();
  console.log("Adding new user", uuid);
  return res.json({ action: "register", uuid: uuid });
};
