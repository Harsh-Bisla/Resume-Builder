const express = require("express");
const {
  signUp,
  Login,
  getUserProfile,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const isAuthenticated = require("../middlewares/auth");
const registerValidation = require("../validators/registerValidator");
const loginValidator = require("../validators/loginValidator");
const userRouter = express.Router();

// routes
userRouter.post("/signup", registerValidation, signUp);
userRouter.post("/login", loginValidator, Login);
userRouter.get("/get-profile", isAuthenticated, getUserProfile);

module.exports = userRouter;
