import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoAdd, IoCloseOutline, IoHandLeft } from "react-icons/io5";

const SkillsForm = ({ skills, setData, errors }) => {
  // function to add new work experience
  const addNewSkill = () => {
    setData((prev) => ({
      ...prev,
      skillsInfo: [...prev.skillsInfo, { skill: "", proficiency: null }],
    }));
  };

  const deleteSkill = (index) => {
    setData((prev) => ({
      ...prev,
      skillsInfo: prev.skillsInfo.filter((_, i) => i !== index),
    }));
  };
  // function to change the values of the experiences
  const handleChangeSkill = (idx, newVal) => {
    setData((prev) => ({
      ...prev,
      skillsInfo: prev.skillsInfo.map((skill, index) =>
        index === idx ? { ...skill, ...newVal } : skill
      ),
    }));
  };

  // functoin to set the proficiency
  const handleSetProficiency = (idx, proficiency) => {
    setData((prev) => ({
      ...prev,
      skillsInfo: prev.skillsInfo.map((skill, index) =>
        index === idx ? { ...skill, proficiency } : skill
      ),
    }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Skills</h1>

      <div className="relative w-full gap-5 my-5 bg-white shadow rounded-2xl p-4">
        {skills?.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center mb-5 justify-start gap-4 w-full flex-wrap sm:flex-nowrap"
          >
            <div className="flex flex-col gap-1.5 w-full sm:w-1/2 group">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor={`skillname-${idx}`}
              >
                Skill Name
              </label>
              <input
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="Skill Name"
                id={`skillname-${idx}`}
                value={skill?.skill}
                onChange={(e) =>
                  handleChangeSkill(idx, { skill: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:w-1/2">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor={`proficiency-${idx}`}
              >
                Proficiency ({skill.proficiency}/5)
              </label>
              <div className="flex items-center justify-start gap-2">
                {[1, 2, 3, 4, 5].map((value, index) => (
                  <div
                    key={index}
                    onClick={() => handleSetProficiency(idx, value)}
                    className={`w-6 h-6 rounded-xs cursor-pointer hover:bg-purple-400 transition-colors duration-300 ${
                      skill.proficiency >= index + 1
                        ? "bg-purple-400"
                        : "bg-purple-200"
                    }`}
                  ></div>
                ))}
                <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center bg-white ml-2  hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
                  <IoCloseOutline
                    onClick={() => deleteSkill(idx)}
                    className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {Object.keys(errors).length > 0 && (
          <div className="flex my-2 items-center justify-start gap-1.5 max-w-[450px] w-full border border-amber-400 rounded-xl p-4 mx-auto bg-[#fefbea]">
            <IoIosInformationCircleOutline className="text-[#ab764e]" />
            <p className="text-sm text-[#ab764e]">{errors.skills}.</p>
          </div>
        )}
      </div>

      <button
        onClick={addNewSkill}
        className="bg-gradient-to-r from-[#fe9700] to-[#ff6c00] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#ff6c00] hover:to-[#fe9700] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;
