const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.routes");
const resumeRouter = require("./routes/resume.route");
const MONGO_URL = process.env.DATABASE_URL;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect DB
connectDB(`${MONGO_URL}resume-builder`)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("Mongo DB Connection error", err.message));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resume", resumeRouter);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
