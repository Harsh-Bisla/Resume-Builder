const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log("Database connection error", error.message);
  }
}

module.exports = connectDB;
