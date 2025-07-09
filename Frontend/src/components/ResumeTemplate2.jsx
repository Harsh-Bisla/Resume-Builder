import "../App.css";

const ResumeTemplate2 = ({ data }) => {
  const {
    personalInfo,
    contactInfo,
    educationInfo,
    projectsInfo,
    skillsInfo,
    additionalInfo,
  } = data;

  return (
    <div className="resume">
      <header>
        <h1>{personalInfo.fullName}</h1>
        <p className="location">📍 {contactInfo.address}</p>
        <p className="contact">
          📧 {contactInfo.email} | 📞 {contactInfo.phone} | 🌐{" "}
          <a href={contactInfo.portfolio} target="_blank" rel="noreferrer">
            Portfolio
          </a>{" "}
          | 💻{" "}
          <a href={contactInfo.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{personalInfo.summary}</p>
      </section>

      <section>
        <h2>Education</h2>
        {educationInfo.map((edu, index) => (
          <div className="item" key={index}>
            <h3>{edu.institution}</h3>
            <p>
              {edu.degree} ({edu.startDate} – {edu.endDate})
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projectsInfo.map((proj, index) => (
          <div className="item" key={index}>
            <h3>
              {proj.title}{" "}
              {proj.liveDemo && (
                <a href={proj.liveDemo} target="_blank" rel="noreferrer">
                  Live Demo ↗
                </a>
              )}
            </h3>
            <ul>
              {proj.description.split("\n").map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
              {proj.githubLink && (
                <li>
                  <strong>Code:</strong>{" "}
                  <a href={proj.githubLink} target="_blank" rel="noreferrer">
                    {proj.githubLink}
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="skills-list">
          {skillsInfo.map((skill, index) => (
            <li key={index}>{skill.skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Interests</h2>
        <ul className="skills-list">
          {additionalInfo.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <ul className="skills-list">
          {additionalInfo.languages.map((lang, index) => (
            <li key={index}>
              {lang.language} –{" "}
              {lang.proficiency >= 4
                ? "Professional Proficiency"
                : lang.proficiency === 3
                ? "Intermediate"
                : "Beginner"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumeTemplate2;
