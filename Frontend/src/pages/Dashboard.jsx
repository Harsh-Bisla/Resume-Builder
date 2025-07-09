import { AnimatePresence, motion, scale } from "motion/react";
import CreateResume from "../components/CreateResume";
import { useContext, useEffect, useState } from "react";
import ResumeThumbnailCard from "../components/ResumeThumbnailCard";
import { resumeStore } from "../context/resumeContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineNoteAdd } from "react-icons/md";
import DeletePopUp from "../components/DeletePopUp";
import DashboardLoader from "../components/DashboardLoader";

const Dashboard = () => {
  const [newResumePopup, setNewResumePopup] = useState(false);
  const {
    getAllResumes,
    resumes,
    setDeleteResumePopUp,
    deleteResumePopUp,
    loading,
  } = useContext(resumeStore);

  useEffect(() => {
    getAllResumes();
    scroll(0, 0);
  }, []);

  const variant = {
    hidden: { opacity: 0, scale: [0.8] },
    visible: { opacity: 1, scale: [0.8, 1.04, 1] },
  };

  return (
    <>
      {loading ? (
        <DashboardLoader />
      ) : (
        <section className="w-full min-h-screen px-4 sm:px-20 lg:px-34 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="text-2xl font-bold">My Resumes</h4>
              <p className="font-medium text-neutral-600 text-[16px]">
                You have {resumes?.length} resumes
              </p>
            </div>
            <button
              onClick={() => setNewResumePopup(true)}
              className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-2xl px-10 py-4 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r flex items-center gap-1 hover:from-[#c300e0] hover:to-[#fd4800] hover:scale-110"
            >
              Create New <MdOutlineNoteAdd />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            <div
              onClick={() => setNewResumePopup(true)}
              className="flex items-center justify-center bg-[#f2f4ff]  w-full rounded-2xl cursor-pointer p-10 border-2 border-dashed border-purple-300 hover:border-purple-400 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8322fc] to-[#c200e1]">
                  <IoAddCircleOutline className="text-white text-4xl font-bold" />
                </div>
                <p className="text-xl font-bold">Create New Resume</p>
                <p className="font-medium text-neutral-600 text-[16px]">
                  Start Building your career.
                </p>
              </div>
            </div>

            {/* Resume Cards  starts here*/}
            {resumes?.map((resume, idx) => {
              return (
                <ResumeThumbnailCard
                  key={idx}
                  resume={resume}
                  setDeleteResumePopUp={setDeleteResumePopUp}
                  deleteResumePopUp={deleteResumePopUp}
                />
              );
            })}
            {/* Resume Cards  ends here*/}
          </div>
        </section>
      )}

      <AnimatePresence>
        {newResumePopup && (
          <CreateResume
            variant={variant}
            setNewResumePopup={setNewResumePopup}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteResumePopUp.value && (
          <DeletePopUp
            deleteResumePopUp={deleteResumePopUp}
            setDeleteResumePopUp={setDeleteResumePopUp}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
