const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user");
const { validateRegister } = require("./../../js/stringUtils.js");
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
      return res
        .status(400)
        .json({ action: "registerError", message: "Vartotojas jau egzistuoja, nurodykite kitą vardą arba el.paštą"});
    }

    const uuid = uuidv4();

    const user = new UserModel({ username, email, uuid });
    const response = await user.save();
    console.log("Adding new user", uuid);
    return res.json({ action: "register", uuid: uuid });
  } catch (e) {
    console.log(e, "Something went wrong");
    return res
      .status(500)
      .json({ action: "registerError", message: "Something went wrong while creating new user" });
  }
};
