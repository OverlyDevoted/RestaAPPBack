const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  scanned_qr_id: { type: [String] },
  photo_id: { type: [String] },
});

const UserModel = mongoose.model("User", UserSchema, "user") 
module.exports = UserModel;
