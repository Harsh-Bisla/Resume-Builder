import React, { useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";

const AdditonalInfoForm = ({ data, setData }) => {
  // function to change the value of the interest
  const handleChangeIntrest = (value, index) => {
    setData((prev) => {
      const updatedInterests = [...prev.additionalInfo.interests];
      updatedInterests[index] = value;
      return {
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          interests: updatedInterests,
        },
      };
    });
  };

  // fucntion to add new interest
  const addNewInterest = (newInterest) => {
    setData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        interests: [...prev.additionalInfo.interests, newInterest],
      },
    }));
  };

  // function to delete interest
  const handleDeleteIntrest = (idx) => {
    setData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        interests: [
          ...prev.additionalInfo.interests.filter((_, index) => index !== idx),
        ],
      },
    }));
  };

  // function to add new language
  const addNewLanguage = () => {
    setData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        languages: [
          ...prev.additionalInfo.languages,
          { language: "", proficiency: 0 }, // default structure for new language
        ],
      },
    }));
  };

  // function to delete language
  const handleDeleteLanguage = (idx) => {
    setData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        languages: [
          ...prev.additionalInfo.languages.filter((_, index) => index !== idx),
        ],
      },
    }));
  };

  // function to change the language
  const handleChangeLanguage = (index, value) => {
    setData((prev) => {
      const updatedLanguage = [...prev.additionalInfo.languages];
      updatedLanguage[index] = {
        ...updatedLanguage[index],
        language: value,
      };

      return {
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          languages: updatedLanguage,
        },
      };
    });
  };

  // function to set the proficiency
  const setProficiency = (index, value) => {
    setData((prev) => {
      const updatedLanguages = [...prev.additionalInfo.languages];
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        proficiency: value,
      };

      return {
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          languages: updatedLanguages,
        },
      };
    });
  };

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Additonal Info</h1>

      {data.languages?.map((language, idx) => (
        <div
          key={idx}
          className="relative w-full my-5 shadow-xl cursor-pointer bg-white rounded-2xl p-6 flex flex-col gap-"
        >
          {data.languages.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute bg-white right-0 top-0 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => handleDeleteLanguage(idx)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}

          <div className="flex items-center justify-start w-full gap-10 flex-wrap sm:flex-nowrap">
            <div className="w-full flex flex-col gap-1.5">
              <label
                className="font-semibold text-sm"
                htmlFor={`language-${idx}`}
              >
                Language
              </label>
              <input
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="Language"
                id={`language-${idx}`}
                value={language.language}
                onChange={(e) => handleChangeLanguage(idx, e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="font-semibold text-sm">
                Proficiency ({language.proficiency} / 5)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((el, index) => (
                  <div
                    key={index}
                    onClick={() => setProficiency(idx, index + 1)}
                    className={`w-5 h-5 cursor-pointer hover:bg-purple-400 transition-colors duration-300 ${
                      language.proficiency < index + 1
                        ? "bg-purple-200"
                        : "bg-purple-400"
                    } rounded-xs`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        // onClick={addNewLanguage}
        onClick={addNewLanguage}
        className="bg-gradient-to-r from-[#695eff] to-[#ab47ff] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#ab47ff] hover:to-[#695eff] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Language
      </button>

      {data.interests.map((intrest, i) => (
        <div key={i} className="flex flex-col relative gap-1.5 my-5">
          <label id={`intrest-${i}`} className="font-semibold text-sm">
            Intrests
          </label>
          {data.interests.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute bg-white right-2 top-[33px] hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => handleDeleteIntrest(i)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Intrests"
            id={`intrest-${i}`}
            value={intrest}
            onChange={(e) => handleChangeIntrest(e.target.value, i)}
          />
        </div>
      ))}

      <button
        // onClick={handleAddIntrest}
        onClick={(e) => addNewInterest(e.target.value)}
        className="bg-gradient-to-r from-[#fe9700] to-[#ff6c00] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#ff6c00] hover:to-[#fe9700] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Intrest
      </button>
    </div>
  );
};

export default AdditonalInfoForm;
