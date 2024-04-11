const express = require("express");
const { CREATE_USER } = require("../controllers/user");

const userRouter = new express.Router();

userRouter.post("/users", CREATE_USER);

module.exports = userRouter;
