const resumeModel = require("../models/resume.model");

// create resume
const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.userId;
    if (!userId)
      return res
        .status(401)
        .send({ message: "userId is required", success: false });
    if (!title)
      return res
        .status(401)
        .send({ message: "title is required", success: false });

    await resumeModel.create({
      resumeTitle: title,
      userId: userId,
      createdAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      updatedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });

    return res
      .status(201)
      .send({ message: "Resume created successfully", success: true });
  } catch (error) {
    return res.status(401).send({
      message: "failed to create resume",
      success: false,
      error: error.message,
    });
  }
};

// delete resume
const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;
    if (!resumeId)
      return res
        .status(400)
        .send({ message: "resumeId is required", success: false });

    await resumeModel.deleteOne({ _id: resumeId });

    return res.status(200).send({ message: "resume deleted", success: true });
  } catch (error) {
    return res.status(401).send({
      message: "failed to delete resume",
      success: false,
      error: error.message,
    });
  }
};

// get single resume
const getResume = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;

    const resume = await resumeModel
      .findById(resumeId)
      .populate({ path: "userId", select: "fullName" })
      .select("-password");
    if (!resume)
      return res
        .status(400)
        .send({ message: "resume not found", success: false });

    return res.status(200).send({ success: true, resume });
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: error.message,
    });
  }
};

// get all resumes
const getAllResumes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumes = await resumeModel
      .find({ userId })
      .populate({ path: "userId", select: "fullName" })
      .select("-password");
    if (!resumes.length)
      return res
        .status(401)
        .send({ message: "no resume found", success: true, resumes : [] });

    return res.status(200).send({ success: true, resumes });
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: error.message,
    });
  }
};

// update resume
const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;
    const { resumeData } = req.body;

    if (!resumeId)
      return res
        .status(400)
        .send({ message: "resumeId is required", success: false });

    // checking the resume exists or not
    const resume = await resumeModel.findById(resumeId);
    if (!resume)
      return res
        .status(400)
        .send({ message: "resume not found", success: false });

    // updating the fields
    resume.updatedAt = new Date().toLocaleString();
    resume.basicInfo = resumeData.basicInfo;
    resume.education = resumeData.education;
    resume.projects = resumeData.projects;
    resume.skills = resumeData.skills;
    resume.languages = resumeData.languages;
    resume.experience = resumeData.experience;
    resume.completionPercentage = resumeData.completionPercentage;
    resume.certificates = resumeData.certificates;
    resume.interests = resumeData.interests;

    // saving the changes
    await resume.save();

    return res.status(200).send({ message: "Resume updated", success: true });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "failed to update resume",
      error: error.message,
    });
  }
};

// function to update the title of the resume
const updateTitle = async (req, res) => {
  const resumeId = req.params.resumeId;
  const { title } = req.body;

  try {
    if (!resumeId)
      return res
        .status(400)
        .send({ message: "Resume id is required", success: false });

    const updatedResume = await resumeModel.findByIdAndUpdate(resumeId, {
      resumeTitle: title,
    });
    if (!updatedResume) {
      return res
        .status(400)
        .send({ message: "Resume not found", success: false });
    }

    return res.status(200).send({ message: "Title Updated", success: true });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "failed to update title",
      error: error.message,
    });
  }
};

module.exports = {
  createResume,
  deleteResume,
  getResume,
  getAllResumes,
  updateResume,
  updateTitle,
};
