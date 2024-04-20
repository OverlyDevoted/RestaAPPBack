const express = require("express");
const { CREATE_SCAN } = require("../controllers/scan");

const scanRouter = new express.Router();

scanRouter.post("/scans", CREATE_SCAN);

module.exports = scanRouter;
