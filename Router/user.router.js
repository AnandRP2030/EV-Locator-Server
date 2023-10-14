const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser } = require("../Controllers/userController.js");

userRouter.get("/", (req, res) => {
  res.send("user router works");
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
module.exports = { userRouter };
