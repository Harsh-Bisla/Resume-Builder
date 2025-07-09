import { useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const EducationInfoForm = ({ data, setData }) => {


  // function to add new work experience
  const handleAddEducation = () => {
    setData((prev) => ({
      ...prev,
      educationInfo: [
        ...prev.educationInfo,
        { degree: "", instution: "", startDate: "", endDate: "" },
      ],
    }));
  };

  // function to delete work experience
  const handleDeleteForm = (idx) => {
    setData((prev) => ({
      ...prev,
      educationInfo: prev.educationInfo.filter((_, index) => index !== idx),
    }));
  };

  // function to change the values of the experiences
const handleValueChange = (idx, newVal) => {
  setData((prev) => ({
    ...prev,
    educationInfo: prev.educationInfo.map((edu, index) =>
      index === idx ? { ...edu, ...newVal } : edu
    ),
  }));
};

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Education</h1>

      {data?.map((form, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 w-full relative grid-rows-2 gap-6 my-5 shadow  rounded-2xl p-4"
        >
          {data?.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-0 top-0hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => handleDeleteForm(idx)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`degree-${idx}`}
            >
              Degree
            </label>
            <input
              type="text"
              id={`degree-${idx}`}
              placeholder="B.Tech"
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              value={form?.degree}
              onChange={(e) =>
                handleValueChange(idx, { degree: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`instution-${idx}`}
            >
              Instution
            </label>
            <input
              type="text"
              id={`institution-${idx}`}
              placeholder="ABC University"
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              value={form?.institution}
              onChange={(e) =>
                handleValueChange(idx, { institution: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`degreestartdate-${idx}`}
            >
              Start Date
            </label>
            <input
              type="date"
              id={`degreestartdate-${idx}`}
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              value={form?.startDate}
              onChange={(e) =>
                handleValueChange(idx, { startDate: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`degreeenddate-${idx}`}
            >
              End Date
            </label>
            <input
              type="date"
              id={`degreeenddate-${idx}`}
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              value={form?.endDate}
              onChange={(e) =>
                handleValueChange(idx, { endDate: e.target.value })
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAddEducation}
        className="bg-gradient-to-r from-[#695eff] to-[#ab47ff] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#ab47ff] hover:to-[#695eff] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Education
      </button>
    </div>
  );
};

export default EducationInfoForm;
