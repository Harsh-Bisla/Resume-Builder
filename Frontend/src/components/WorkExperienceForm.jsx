import { useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const WorkExperienceForm = ({ workExperience, setData }) => {
  // function to add new work experience
  const addNewExperience = () => {
    setData((prev) => ({
      ...prev,
      workExperience: [
        ...workExperience,
        { company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  };

  // function to delete work experience
  const deleteExperience = (idx) => {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, index) => index !== idx),
    }));
  };

  // function to change the values of the experiences
  const handleChangeExperience = (idx, newVal) => {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, index) =>
        index === idx ? { ...exp, ...newVal } : exp
      ),
    }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Work Experience</h1>

      {workExperience.map((experience, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 w-full relative grid-rows-2 gap-6 my-5 border border-zinc-200 rounded-2xl shadow-[0_0_20px_3px_rgba(1,200,81,0.25)] p-4 bg-white"
        >
          {workExperience?.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-0 top-0hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => deleteExperience(idx)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`company-${idx}`}
            >
              Company
            </label>
            <input
              type="text"
              id={`company=${idx}`}
              value={experience?.company}
              onChange={(e) =>
                handleChangeExperience(idx, { company: e.target.value })
              }
              placeholder="ABC Corporation"
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`role=${idx}`}
            >
              Role
            </label>
            <input
              type="text"
              id={`role=${idx}`}
              value={experience?.role}
              placeholder="Frontend Developer"
              onChange={(e) =>
                handleChangeExperience(idx, { role: e.target.value })
              }
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`startDate=${idx}`}
            >
              Start Date
            </label>
            <input
              type="date"
              id={`startDate=${idx}`}
              placeholder=""
              value={experience?.startDate}
              onChange={(e) =>
                handleChangeExperience(idx, { startDate: e.target.value })
              }
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`endDate=${idx}`}
            >
              End Date
            </label>
            <input
              type="date"
              id={`endDate=${idx}`}
              value={experience?.endDate}
              onChange={(e) =>
                handleChangeExperience(idx, { endDate: e.target.value })
              }
              placeholder=""
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>
          <div className="flex w-full flex-col gap-1 my-5 col-span-2 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor="roleDescription"
            >
              Description
            </label>
            <textarea
              rows={4}
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out resize-none "
              name="roleDescription"
              id="roleDescription"
              value={experience?.description}
              onChange={(e) =>
                handleChangeExperience(idx, { description: e.target.value })
              }
              placeholder="What did you do in this role?"
            ></textarea>
          </div>
        </div>
      ))}
      <button
        onClick={addNewExperience}
        className="bg-gradient-to-r from-[#01c851] to-[#00bd7b] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#00bd7b] hover:to-[#01c851] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
