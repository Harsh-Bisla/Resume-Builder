const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token)
      return res.send({ message: "Unauthorizes access", success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Internal Server error", error: error.message });
  }
};

module.exports = isAuthenticated;
