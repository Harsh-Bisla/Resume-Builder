import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { resumeStore } from "../context/resumeContext";
import {motion} from "motion/react";

const DeletePopUp = ({ deleteResumePopUp, setDeleteResumePopUp }) => {
  const { deleteResume } = useContext(resumeStore);

  const popUpVariants = {
    hidden : {opacity : 0, scale : 0.8},
    visible : {opacity : 1, scale : [1, 1.01,1]}
  }

  return (
    <div className="inset-0 z-10 w-full h-screen fixed top-0 flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      <motion.div
      variants={popUpVariants}
      initial = "hidden"
      animate = "visible"
      exit={{opacity : 0, scale : 0.8}}
      transition={{duration : 0.2, ease : "easeInOut"}}
      className="relative z-10 bg-[#f4f4f4] rounded-3xl m-2">
        <div className="bg-white rounded-t-3xl flex items-center justify-center p-8">
          <h2 className="text-2xl mx-auto font-extrabold">Confirm Deletion</h2>
        </div>
        <div className="flex flex-col items-center p-4 gap-1.5">
          <span className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center">
            {" "}
            <RiDeleteBin6Line className="text-xl text-red-400" />
          </span>
          <p className="text-lg font-bold">Delete Resume?</p>
          <p className="text-zinc-500 text-center">
            Are you sure you want to delete this resume? This action cannot be
            undone.
          </p>
          <div className="flex items-center justify-center gap-5 my-3">
            <button
              onClick={() =>
                setDeleteResumePopUp((prev) => ({
                  ...prev,
                  value: false,
                }))
              }
              className="bg-gradient-to-r from-[#fe9700] to-[#ff6c00] text-base rounded-xl px-6 py-2.5 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#ff6c00] hover:to-[#fe9700] hover:scale-110"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteResume(deleteResumePopUp.resumeId);
                setDeleteResumePopUp(false);
              }}
              className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-xl px-6 py-2.5 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeletePopUp;
