const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const userRouter = require("./routers/user.js");
const imageRouter = require("./routers/image.js");
const scanRouter = require("./routers/scan.js");

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("Could not connect DB", e);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(imageRouter);
app.use(scanRouter);

app.get("/ping", (req, res) => {
  console.log("Pinged");
  return res.send({ action: "working", uuid: "", payload: "" });
});
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
