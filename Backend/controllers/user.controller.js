const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const uploadOnCloudinary = require("../utils/cloudinary");
const { validationResult } = require("express-validator");

// Register user
const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ success: false, message: errors.errors[0].msg });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User Already exists", success: false });

    bcrypt.hash(password, 12, async (err, hash) => {
      if (err)
        return res
          .status(500)
          .send({ message: "failed to signup", success: false });

      const user = await userModel.create({
        fullName,
        email,
        password: hash,
      });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return res
        .status(201)
        .send({ message: "User registered", success: true, token });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to Signup", success: false });
  }
};

// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ success: false, message: errors.errors[0].msg });
    }

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User not found with this email!", success: false });

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result)
        return res
          .status(401)
          .send({ message: "Incorrect email or password", success: false });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.status(200).send({
        message: `Welcome back ${user.fullName}`,
        success: true,
        token,
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "failed to login", success: false });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId)
      return res
        .status(400)
        .send({ message: "userId is required", success: false });

    const user = await userModel.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .send({ message: "user not found", success: false });

    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server error", success: false });
  }
};

module.exports = {
  signUp,
  Login,
  getUserProfile,
};
