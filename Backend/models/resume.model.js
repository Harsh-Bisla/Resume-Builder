const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  resumeTitle: {
    type: String,
    required: true,
  },
  basicInfo: {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String },
    dob: { type: String },
    linkedIn: { type: String },
    github: { type: String },
    portfolio: { type: String },
    summary: { type: String },
  },
  education: [
    {
      institution: { type: String },
      degree: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      percentage: { type: String },
    },
  ],
  projects: [
    {
      title: { type: String },
      description: { type: String },
      githubLink: [String],
      liveDemo: { type: String },
    },
  ],
  skills: [
    {
      skill: String,
      proficiency: Number,
    },
  ],
  languages: [
    {
      language: String,
      proficiency: Number,
    },
  ],
  createdAt: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: String,
    default: "",
  },
  experience: [
    {
      role: { type: String },
      company: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      location: { type: String },
      description: { type: String },
    },
  ],
  certificates: [
    {
      title: { type: String },
      issuer: { type: String },
      year: { type: String },
    },
  ],
  interests: [{ type: String }],
  completionPercentage: {
    type: Number,
    default: 0,
  },
});

const resumeModel = mongoose.model("resume", resumeSchema);
module.exports = resumeModel;
