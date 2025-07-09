import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const resumeStore = createContext();

function ResumeProvider({ children }) {
  const succMsg = (msg) => toast.success(msg);
  const errMsg = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteResumePopUp, setDeleteResumePopUp] = useState({
    value: false,
    resumeId: "",
  });

  // get all resumes
  const getAllResumes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resume/get-all-resumes`,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data) {
        setResumes(data.resumes);
        return;
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // create new resume
  const createNewResume = async (title, setNewResumePopup) => {
    if (!title) {
      errMsg("Title is required");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resume/create-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ title }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        succMsg(data.message);
        setNewResumePopup(false);
        getAllResumes();
      } else {
        errMsg(data.message);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // get single resume
  const getSingleResume = async (resumeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resume/get-resume/${resumeId}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (!data.success) {
        errMsg(data.message);
      } else {
        setResume(data.resume);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // update title of the resume
  const updateResumeTitle = async (title, resumeId) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/resume/update-resume-title/${resumeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ title }),
        }
      );
      const data = await res.json();
      if (data.success) {
        succMsg(data.message);
        getSingleResume(resumeId);
      } else {
        errMsg(data.message);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // delete resume
  const deleteResume = async (resumeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resume/delete-resume/${resumeId}`,
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        succMsg(data.message);
        await getAllResumes();
        if (resumes.length === 1) {
          navigate("/dashboard");
        }
      } else {
        errMsg(data.message);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // update resume
  const updateResume = async (
    formData,
    resumeId,
    calculateCompletionPercentage
  ) => {
    try {
      const newCompletionPercentage = calculateCompletionPercentage(formData);
      const resumeData = {
        basicInfo: {
          fullName: formData.personalInfo.fullName,
          email: formData.contactInfo.email,
          phone: formData.contactInfo.phone,
          address: formData.contactInfo.address,
          role: formData.personalInfo.designation,
          linkedIn: formData.contactInfo.linkedIn,
          summary: formData.personalInfo.summary,
          github: formData.contactInfo.github,
          portfolio: formData.contactInfo.portfolio,
        },
        education: formData.educationInfo,
        projects: formData.projectsInfo,
        skills: formData.skillsInfo,
        languages: formData.additionalInfo.languages,
        experience: formData.workExperience,
        completionPercentage: newCompletionPercentage,
        certificates: formData.certificates,
        interests: formData.additionalInfo.interests,
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resume/update-resume/${resumeId}`,
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeData }),
        }
      );
      const data = await res.json();
      if (data.success) {
        succMsg(data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  return (
    <resumeStore.Provider
      value={{
        getAllResumes,
        resumes,
        getSingleResume,
        createNewResume,
        resume,
        updateResumeTitle,
        deleteResume,
        updateResume,
        loading,
        deleteResumePopUp,
        setDeleteResumePopUp,
      }}
    >
      {children}
    </resumeStore.Provider>
  );
}

export default ResumeProvider;
