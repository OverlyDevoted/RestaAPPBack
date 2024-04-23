const express = require("express");
const { CREATE_USER, DELETE_USER } = require("../controllers/user");

const userRouter = new express.Router();

userRouter.post("/users", CREATE_USER);
userRouter.delete("/users", DELETE_USER);

module.exports = userRouter;
