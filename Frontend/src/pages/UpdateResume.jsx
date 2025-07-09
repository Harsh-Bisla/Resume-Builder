import { IoIosColorPalette } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { TfiSaveAlt } from "react-icons/tfi";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ConactInfoForm from "../components/ConactInfoForm";
import WorkExperienceForm from "../components/WorkExperienceForm";
import EducationInfoForm from "../components/EducationInfoForm";
import SkillsForm from "../components/SkillsForm";
import ProjectsForm from "../components/ProjectsForm";
import CertificationForm from "../components/CertificationForm";
import AdditonalInfoForm from "../components/AdditonalInfoForm";
import { resumeStore } from "../context/resumeContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ResumeTemplateOne from "../components/ResumeTemplateOne";
import ResumePreview from "../components/ResumePreview";
import { AnimatePresence } from "motion/react";
import ResumeTemplate2 from "../components/ResumeTemplate2";
import ThemeComponent from "../components/ThemeComponent";
import TemplateImage from "../assets/Template.png";
import DeletePopUp from "../components/DeletePopUp";
const UpdateResume = () => {
  const [editTitle, setEditTitle] = useState(false);
  const navigate = useNavigate();
  const {
    getSingleResume,
    resume,
    updateResumeTitle,
    deleteResume,
    updateResume,
    setDeleteResumePopUp,
    deleteResumePopUp,
  } = useContext(resumeStore);
  const { resumeId } = useParams();
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template-1");
  const [previewPopUp, setPreviewPopUp] = useState(false);
  const [themePopUp, setThemePopUp] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: { fullName: "", designation: "", summary: "" },
    contactInfo: {
      address: "",
      email: "",
      phone: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
    workExperience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ],
    educationInfo: [
      { degree: "", institution: "", startDate: "", endDate: "" },
    ],
    skillsInfo: [{ skill: "", proficiency: null }],
    projectsInfo: [
      { title: "", description: "", githubLink: "", liveDemo: "" },
    ],
    certificates: [{ title: "", issuer: "", year: "" }],
    additionalInfo: {
      languages: [{ language: "", proficiency: 0 }],
      interests: [""],
    },
    completionPercentage: 0,
  });

  const templates = [
    {
      templateId: "template-1",
      image: TemplateImage,
      id: 0,
    },
  ];

  // function to change the template
  const RenderResume = () => {
    if (selectedTemplate === "template-1")
      return <ResumeTemplateOne data={formData} />;
    if (selectedTemplate === "template-2")
      return <ResumeTemplate2 data={formData} />;
    return null;
  };

  const formSteps = [
    "personal-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills-info",
    "projects-info",
    "certificate-form",
    "additonal-info",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const form = formSteps[currentStep];
  const [errors, setErrors] = useState({});

  // function to validate form
  const validateCurrentForm = () => {
    let errors = {};

    if (form === "personal-info") {
      if (!formData.personalInfo.fullName?.trim()) {
        errors.fullName = "Name is required";
      }
      if (!formData.personalInfo.designation?.trim()) {
        errors.designation = "designation is required";
      }
      if (!formData.personalInfo.summary?.trim()) {
        errors.summary = "summary is required";
      }
    }

    if (form === "contact-info") {
      if (!formData.contactInfo.email?.trim()) {
        errors.email = "Email is required";
      }
      if (!formData.contactInfo.address?.trim()) {
        errors.address = "Address is required";
      }

      if (!formData.contactInfo.linkedIn?.trim()) {
        errors.linkedIn = "LinkedIn Id is required";
      }
      if (!formData.contactInfo.github?.trim()) {
        errors.github = "Github Id id is required";
      }
      if (!formData.contactInfo.phone?.trim()) {
        errors.phone = "Phone number is required";
      }
      // Optional: Validate proper email format using regex
      else if (!/^\S+@\S+\.\S+$/.test(formData.contactInfo.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (form === "education-info") {
      if (formData.educationInfo.length === 0) {
        errors.general = "At least one education entry is required";
      } else {
        formData.educationInfo.forEach((edu, index) => {
          if (!edu.institution?.trim()) {
            errors[`institution_${index}`] = "Institution is required";
          }
          if (!edu.degree?.trim()) {
            errors[`degree_${index}`] = "Degree is required";
          }
          if (!edu.startDate?.trim()) {
            errors[`year_${index}`] = "Start Date is required";
          }
          if (!edu.endDate?.trim()) {
            errors[`year_${index}`] = "End Date is required";
          }
        });
      }
    }

    if (form === "skills-info") {
      if (formData.skillsInfo.length === 0) {
        errors.skills = "At least one skill is required";
      } else if (
        formData.skillsInfo.some((skillObj) => !skillObj.skill.trim())
      ) {
        errors.skills = "Skill names cannot be empty";
      } else if (
        formData.skillsInfo.some((skillObj) => skillObj.proficiency === null)
      ) {
        errors.skills = "Each skill must have a proficiency level";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateCompletionPercentage = (data) => {
    let completedSections = 0;

    // personal info
    const personalValues = Object.values(data.personalInfo || {});
    if (personalValues.every((val) => val?.toString().trim() !== "")) {
      completedSections++;
    }

    // 1. Contact Info
    const contactValues = Object.values(data.contactInfo || {});
    if (contactValues.every((val) => val?.toString().trim() !== "")) {
      completedSections++;
    }

    // 2. Work Experience
    if (
      Array.isArray(data.workExperience) &&
      data.workExperience.length > 0 &&
      data.workExperience.every(
        (exp) =>
          exp.company?.trim() &&
          exp.role?.trim() &&
          exp.startDate?.trim() &&
          exp.endDate?.trim() &&
          exp.description?.trim()
      )
    ) {
      completedSections++;
    }

    // 3. Education Info
    if (
      Array.isArray(data.educationInfo) &&
      data.educationInfo.length > 0 &&
      data.educationInfo.every(
        (edu) =>
          edu.degree?.trim() &&
          edu.institution?.trim() &&
          edu.startDate?.trim() &&
          edu.endDate?.trim()
      )
    ) {
      completedSections++;
    }

    // 4. Skills Info
    if (
      Array.isArray(data.skillsInfo) &&
      data.skillsInfo.length > 0 &&
      data.skillsInfo.every(
        (skill) => skill.skill?.trim() && skill.proficiency !== null
      )
    ) {
      completedSections++;
    }

    // 5. Projects Info
    if (
      Array.isArray(data.projectsInfo) &&
      data.projectsInfo.length > 0 &&
      data.projectsInfo.every(
        (proj) =>
          proj.title?.trim() &&
          proj.description?.trim() &&
          proj.githubLink?.trim() &&
          proj.liveDemo?.trim()
      )
    ) {
      completedSections++;
    }

    // 6. Certificates
    if (
      Array.isArray(data.certificates) &&
      data.certificates.length > 0 &&
      data.certificates.every(
        (cert) =>
          cert.title?.trim() &&
          cert.issuer?.trim() &&
          cert.year?.toString().trim()
      )
    ) {
      completedSections++;
    }

    // 7. Languages
    if (
      Array.isArray(data.additionalInfo?.languages) &&
      data.additionalInfo.languages.length > 0 &&
      data.additionalInfo.languages.every(
        (lang) => lang.language?.trim() && lang.proficiency > 0
      )
    ) {
      completedSections++;
    }

    // 8. Interests
    if (
      Array.isArray(data.additionalInfo?.interests) &&
      data.additionalInfo.interests.length > 0 &&
      data.additionalInfo.interests.every((int) => int?.trim() !== "")
    ) {
      completedSections++;
    }

    const percentage = completedSections * 12.5;
    return percentage;
  };

  // functionn to move next part of the form
  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      const result = validateCurrentForm();
      if (result) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateTitle = () => {
    setEditTitle(false);
    updateResumeTitle(title, resumeId);
  };

  // Fetch resume once when resumeId is available
  useEffect(() => {
    if (resumeId) {
      getSingleResume(resumeId);
    }
  }, [resumeId]);

  //  setting the values from the backend
  useEffect(() => {
    if (resume) {
      setFormData({
        personalInfo: {
          fullName: resume?.basicInfo?.fullName || "",
          designation: resume?.basicInfo?.role || "",
          summary: resume?.basicInfo?.summary || "",
        },
        contactInfo: {
          address: resume?.basicInfo?.address || "",
          email: resume?.basicInfo?.email || "",
          phone: resume?.basicInfo?.phone || "",
          linkedIn: resume?.basicInfo?.linkedIn || "",
          github: resume?.basicInfo?.github || "",
          portfolio: resume?.basicInfo?.portfolio || "",
        },
        workExperience: resume.experience || [
          {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
        educationInfo: resume.education || [
          { degree: "", institution: "", startDate: "", endDate: "" },
        ],
        skillsInfo: resume.skills || [{ skill: "", proficiency: null }],
        projectsInfo: resume.projects || [
          { title: "", description: "", githubLink: "", liveDemo: "" },
        ],
        certificates: resume.certificates || [
          { title: "", issuer: "", year: "" },
        ],
        additionalInfo: {
          languages: resume.languages || [{ language: "", proficiency: 0 }],
          interests: resume.interests || [""],
        },
        completionPercentage: resume.completionPercentage || 0,
      });
      setTitle(resume?.resumeTitle);
    }
  }, [resume]);

  // When resume data is available, update the title
  useEffect(() => {
    if (resume) {
      setTitle(resume.resumeTitle || "");
    }
    scroll(0, 0);
  }, [resume]);

  return (
    <section className="py-4 px-3 sm:px-10 md:px-24 bg-gradient-to-b from-[#e5e1ef] to-white]">
      {/* Header Starts Here */}

      <div className="flex items-center flex-wrap gap-1.5 bg-white justify-between rounded-2xl p-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
        {editTitle ? (
          <div className="flex items-end gap-2">
            <input
              type="text"
              className="border-b font-bold py-1 px-2 border-purple-300 outline-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateTitle();
                }
              }}
            />
            <FaCheck
              onClick={updateTitle}
              className="text-purple-500 cursor-pointer text-base"
            />
          </div>
        ) : (
          <h1 className="font-bold text-lg flex items-center gap-1">
            {resume?.resumeTitle}{" "}
            <MdOutlineEdit
              onClick={() => setEditTitle(true)}
              className="text-purple-500 cursor-pointer text-base"
            />
          </h1>
        )}

        <div className="flex items-center justify-start sm:justify-center flex-wrap gap-3">
          <button
            onClick={() => setThemePopUp(true)}
            className="text-sm text-purple-800 font-bold bg-[#edeaff] px-4 py-3 rounded-xl cursor-pointer flex items-center gap-1.5 hover:bg-[#d7d0fa] transition-colors duration-300"
          >
            <IoIosColorPalette /> Change Theme
          </button>

          <button
            onClick={() => {
              setDeleteResumePopUp({value : true, resumeId : resumeId})
              navigate("/dashboard");
            }}
            className="text-sm flex items-center text-red-600 rounded-xl  bg-[#ffe3e2] font-bold px-4 py-3 cursor-pointer gap-1.5 hover:bg-[#fec3c1] transition-colors duration-300"
          >
            <RiDeleteBinLine /> Delete
          </button>

          <button
            onClick={() => setPreviewPopUp(true)}
            className="text-sm flex items-center text-[#09914f] rounded-xl  bg-[#d0fae6] font-bold px-4 py-3 cursor-pointer gap-1.5 hover:bg-[#baffde] transition-colors duration-300"
          >
            <FiDownload /> Preview & Download
          </button>
        </div>
      </div>

      {/* Header Ends Here */}

      {/* Info and Preview Section Starts Here */}
      <section className="flex items-start justify-between gap-2.5 w-full my-5 rounded-3xl">
        <div className="w-full lg:w-1/2 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-3xl bg-gradient-to-t from-[#fef2f2] to-white p-3 lg:p-6">
          {form === "personal-info" && (
            <PersonalInfoForm
              data={formData?.personalInfo}
              setData={(data) =>
                setFormData((prev) => ({ ...prev, personalInfo: data }))
              }
              errors={errors}
            />
          )}
          {form === "contact-info" && (
            <ConactInfoForm
              data={formData?.contactInfo}
              setData={(data) =>
                setFormData((prev) => ({ ...prev, contactInfo: data }))
              }
              errors={errors}
            />
          )}
          {form === "work-experience" && (
            <WorkExperienceForm
              workExperience={formData.workExperience}
              setData={setFormData}
            />
          )}

          {form === "education-info" && (
            <EducationInfoForm
              data={formData?.educationInfo}
              setData={setFormData}
            />
          )}
          {form === "skills-info" && (
            <SkillsForm
              skills={formData?.skillsInfo}
              setData={setFormData}
              errors={errors}
            />
          )}
          {form === "projects-info" && (
            <ProjectsForm
              projects={formData?.projectsInfo}
              setData={setFormData}
            />
          )}
          {form === "certificate-form" && (
            <CertificationForm
              certifications={formData.certificates}
              setData={setFormData}
            />
          )}
          {form === "additonal-info" && (
            <AdditonalInfoForm
              data={formData.additionalInfo}
              setData={setFormData}
            />
          )}

          {/* Navigate Buttons Starts Here */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handlePrev}
              className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-sm rounded-xl px-4 py-3 sm:px-7 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110 flex items-center gap-1"
            >
              <IoArrowBack /> Back
            </button>

            <button
              onClick={() =>
                updateResume(
                  formData,
                  resume?._id,
                  calculateCompletionPercentage
                )
              }
              className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-sm rounded-xl px-4 py-3 sm:px-7 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110 flex items-center gap-1"
            >
              <TfiSaveAlt /> Save & Exit
            </button>
            {currentStep !== formSteps.length - 1 && (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-sm rounded-xl px-4 py-3 sm:px-7 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110 flex items-center gap-1"
              >
                Next <IoArrowForward />
              </button>
            )}
          </div>
          {/* Navigate Buttons Ends Here */}
        </div>
        <div className="hidden lg:block lg:w-1/2 ">{RenderResume()}</div>
      </section>
      {/* Info and Preview Section Ends Here */}

      {/* Resume Preview Popup */}
      <AnimatePresence>
        {previewPopUp && (
          <ResumePreview
            data={formData}
            title={title}
            setPreviewPopUp={setPreviewPopUp}
            RenderResume={RenderResume}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {themePopUp && (
          <ThemeComponent
            setThemePopUp={setThemePopUp}
            templates={templates}
            RenderResume={RenderResume}
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
          />
        )}
      </AnimatePresence>
        {deleteResumePopUp.value && <DeletePopUp/>}
      
    </section>
  );
};

export default UpdateResume;
