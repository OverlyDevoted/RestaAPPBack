const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const { v4: uuid } = require("uuid");
const profanityFilter = require("./utils/profanityFilter.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("Could not connect DB", e);
  });
app.post("/register", (req, res) => {
  const { username, email } = req.body;
  if (profanityFilter.isProfane(username) || profanityFilter.isProfane(email)) {
    return res.status(409).json({ error: "Profane credentials" });
  }
  return res.json({ uuid: uuid() });
});

app.post("/saveqr/:id", (req, res) => {
  const { id: qrId } = req.params;
  if (!id) {
    return res.status(409).json({ error: "Missing QR" });
  }
});
app.get("/ping", (req, res) => {
  return res.send("OK");
});
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
