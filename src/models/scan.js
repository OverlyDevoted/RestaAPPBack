const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  qr: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

const ScanModel = mongoose.model("Scan", ScanSchema, "scan");
module.exports = ScanModel;
