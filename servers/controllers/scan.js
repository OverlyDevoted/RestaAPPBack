const ScanModel = require("../models/scan");

module.exports.CREATE_SCAN = async (req, res) => {
  try {
    const { uuid, qr } = req.body;
    if (!uuid || !qr) return res.status(500).json({ message: "Invalid body" });
  
    const scan = new ScanModel({ uuid, qr, timeStamp: new Date() });
    const response = await scan.save();
    console.log("User scanned", response);
    return res.json({message:"success"}) 
  }
  catch(e) {
    console.log(e)
  }
};
