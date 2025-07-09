const express = require("express");
const resumeRouter = express.Router();
const isAuthenticated = require("../middlewares/auth");
const {
  createResume,
  deleteResume,
  getResume,
  getAllResumes,
  updateResume,
  updateTitle,
} = require("../controllers/resume.controller");

resumeRouter.post("/create-resume", isAuthenticated, createResume);
resumeRouter.post("/delete-resume/:resumeId", isAuthenticated, deleteResume);
resumeRouter.get("/get-resume/:resumeId", isAuthenticated, getResume);
resumeRouter.get("/get-all-resumes", isAuthenticated, getAllResumes);
resumeRouter.post("/update-resume/:resumeId", isAuthenticated, updateResume);
resumeRouter.post("/update-resume-title/:resumeId", isAuthenticated, updateTitle);

module.exports = resumeRouter;
