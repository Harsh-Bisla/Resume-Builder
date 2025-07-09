const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const uploadOnCloudinary = require("../utils/cloudinary");

// Register user
const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName)
      return res.send({ message: "Name is required", success: false });

    if (!email)
      return res.send({ message: "email is required", success: false });

    if (!password)
      return res.send({ message: "password is required", success: false });

    let avatar = "";

    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res
        .status(401)
        .send({ message: "User Already exists", success: false });

    if (req.file) {
      const localFilePath = req.file.path;
      const response = await uploadOnCloudinary(localFilePath);
      avatar = response.url;
    }

    bcrypt.hash(password, 12, async (err, hash) => {
      if (err)
        return res
          .status(401)
          .send({ message: "failed to signup", success: false });

      const user = await userModel.create({
        fullName,
        email,
        password: hash,
        avatar,
      });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return res
        .status(201)
        .send({ message: "User registered", success: true, token });
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ message: "Failed to Signup", success: false });
  }
};

// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(401)
        .send({ message: "Email is required", success: false });

    if (!password)
      return res
        .status(401)
        .send({ message: "Password is required", success: false });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
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
    return res.status(401).send({ message: "failed to login", success: false });
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
        .status(400)
        .send({ message: "user not found", success: false });

    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Internal Server error", success: false });
  }
};

module.exports = {
  signUp,
  Login,
  getUserProfile,
};
