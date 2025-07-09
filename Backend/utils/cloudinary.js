const cloudinary = require("cloudinary");
const fs = require("fs");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECERT,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("File path is required");
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Cloudinary upload error", error.message);
    fs.unlinkSync(localFilePath);
  }
};

module.exports = uploadOnCloudinary;
