import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { resumeStore } from "../context/resumeContext";
import Loader from "../components/Loader";

const CreateResume = ({ setNewResumePopup }) => {
  const { createNewResume, loading } = useContext(resumeStore);
  const [title, setTitle] = useState("");

  const popUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [1, 1.01, 1] },
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNewResume(title, setNewResumePopup);
    }
  };

  return (
    <div className="inset-0 z-10 w-full h-screen fixed top-0 flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="max-w-[500px] bg-[#f4f4f4] z-30 w-full m-2 py-5 px-6 rounded-3xl relative"
      >
        <div className="w-full mb-4">
          <h1 className="text-xl font-bold">Create New Resume</h1>
          <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-4 top-4 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
            <IoCloseOutline
              onClick={() => setNewResumePopup(false)}
              className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
            />
          </div>
        </div>
        <motion.div className="bg-white rounded-3xl py-8 px-6 flex flex-col gap-6 w-full relative">
          <h1 className="font-bold text-2xl">Create New Resume</h1>
          <p className="text-[16px] text-zinc-500 font-medium -mt-4">
            Give your resume a title to get started You can edit all details
            later.
          </p>

          <div className="flex flex-col items-start gap-1">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor="title"
            >
              Resume Title
            </label>
            <input
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-bold focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out text-neutral-600"
              type="text"
              placeholder="Enter Resume Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => createNewResume(title, setNewResumePopup)}
              className="bg-gradient-to-r from-[#ff2057] to-[#e60076] font-extrabold transition-all duration-200 ease-in-out  hover:scale-105 text-white py-3.5 my-2 cursor-pointer rounded-xl"
            >
              Create Resume
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateResume;
