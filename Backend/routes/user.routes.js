const express = require("express");
const {
  signUp,
  Login,
  getUserProfile,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const isAuthenticated = require("../middlewares/auth");
const userRouter = express.Router();

// routes
userRouter.post("/signup", upload.single("avatar"), signUp);
userRouter.post("/login", Login);
userRouter.get("/get-profile", isAuthenticated, getUserProfile);

module.exports = userRouter;
