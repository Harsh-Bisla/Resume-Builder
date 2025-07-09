import React, { useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProjectsForm = ({ projects, setData }) => {
  // function to add new project
  const handleAddProject = () => {
    setData((prev) => ({
      ...prev,
      projectsInfo: [
        ...prev.projectsInfo,
        { title: "", description: "", githubLink: "", liveDemo: "" },
      ],
    }));
  };

  // function to delete project
  const handleDeleteProject = (idx) => {
    setData((prev) => ({
      ...prev,
      projectsInfo: prev.projectsInfo.filter((_, index) => index !== idx),
    }));
  };

  // function to change the values of the project
  const handleChangeValue = (idx, newValue) => {
    setData((prev) => ({
      ...prev,
      projectsInfo: prev.projectsInfo.map((prj, index) =>
        index === idx ? { ...prj, ...newValue } : prj
      ),
    }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Projects</h1>

      {projects?.map((project, idx) => (
        <div
          key={idx}
          className="relative w-full my-5 shadow-2xl rounded-2xl p-5 flex flex-col gap-6"
        >
          {projects?.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute bg-white right-0 top-0 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => handleDeleteProject(idx)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}
          <div className="flex flex-col gap-2.5 w-full group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`project-title-${idx}`}
            >
              Project Title
            </label>
            <input
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              type="text"
              placeholder="Enter your project title"
              id="project-title"
              value={project.title}
              onChange={(e) =>
                handleChangeValue(idx, { title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor="project-description"
            >
              Project Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your project."
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out resize-none"
              id="project-description"
              value={project.description}
              onChange={(e) =>
                handleChangeValue(idx, { description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="flex items-center justify-start my-2 gap-4 w-full">
            <div className="flex flex-col gap-1 w-1/2 group">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor="github-link"
              >
                Github Link
              </label>
              <input
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="https://www.github.com/username/project"
                id="github-link"
                value={project.githubLink}
                onChange={(e) =>
                  handleChangeValue(idx, { githubLink: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2.5 w-1/2 group">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor="live-demo"
              >
                Live Demo
              </label>
              <input
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="https://www.yourproject.com"
                id="live-demo"
                value={project.liveDemo}
                onChange={(e) =>
                  handleChangeValue(idx, { liveDemo: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddProject}
        className="bg-gradient-to-r from-[#01b7dd] to-[#2783ff] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#2783ff] hover:to-[#01b7dd] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
