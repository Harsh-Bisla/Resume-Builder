import "../App.css";

const ResumeTemplateOne = ({ data }) => {
  const {
    personalInfo,
    contactInfo,
    workExperience,
    educationInfo,
    skillsInfo,
    projectsInfo,
    certificates,
    additionalInfo,
  } = data;

  return (
    <div className="resume-container">
      <h1 className="resume-name">{personalInfo.fullName || "Your Name"}</h1>
      <p className="resume-designation">
        {personalInfo.designation || "Your Designation"}
      </p>
      <p className="resume-summary">
        {personalInfo.summary || "Write your summary here..."}
      </p>

      <hr className="resume-divider" />

      <h2 className="resume-section-title">Contact</h2>
      <ul className="resume-list">
        {contactInfo.email && <li>Email: {contactInfo.email}</li>}
        {contactInfo.phone && <li>Phone: {contactInfo.phone}</li>}
        {contactInfo.linkedIn && <li>LinkedIn: {contactInfo.linkedIn}</li>}
        {contactInfo.github && <li>GitHub: {contactInfo.github}</li>}
        {contactInfo.portfolio && <li>Portfolio: {contactInfo.portfolio}</li>}
      </ul>

      <h2 className="resume-section-title">Work Experience</h2>
      {workExperience.map((exp, i) => (
        <div key={i} className="resume-item">
          <strong>{exp.role}</strong> at {exp.company} ({exp.startDate} -{" "}
          {exp.endDate})<p>{exp.description}</p>
        </div>
      ))}

      <h2 className="resume-section-title">Education</h2>
      {educationInfo.map((edu, i) => (
        <div key={i} className="resume-item">
          <strong>{edu.degree}</strong> at {edu.institution} ({edu.startDate} -{" "}
          {edu.endDate})
        </div>
      ))}

      <h2 className="resume-section-title">Skills</h2>
      <ul className="resume-skills">
        {skillsInfo.map((skill, i) => (
          <li key={i}>
            {skill.skill} ({skill.proficiency}/5)
          </li>
        ))}
      </ul>

      <h2 className="resume-section-title">Projects</h2>
      {projectsInfo.map((proj, i) => (
        <div key={i} className="resume-item">
          <strong>{proj.title}</strong>
          <p>{proj.description}</p>
          {proj.githubLink && <p>GitHub: {proj.githubLink}</p>}
          {proj.liveDemo && <p>Live Demo: {proj.liveDemo}</p>}
        </div>
      ))}

      <h2 className="resume-section-title">Certificates</h2>
      {certificates.map((cert, i) => (
        <p key={i} className="resume-item">
          {cert.title} - {cert.issuer} ({cert.year})
        </p>
      ))}

      <h2 className="resume-section-title">Additional Info</h2>
      <p>
        <strong>Languages:</strong>{" "}
        {additionalInfo.languages.map((l) => l.language).join(", ")}
      </p>
      <p>
        <strong>Interests:</strong> {additionalInfo.interests.join(", ")}
      </p>
    </div>
  );
};

export default ResumeTemplateOne;
