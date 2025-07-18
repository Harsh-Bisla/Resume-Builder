const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
