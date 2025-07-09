import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { SlEnergy } from "react-icons/sl";
import { FaDotCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ResumeThumbnailCard = ({
  resume,
  setDeleteResumePopUp,
  deleteResumePopUp,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/update-resume/${resume?._id}`)}
      className="border border-neutral-200 rounded-3xl w-full cursor-pointer hover:border-purple-300 transition-all duration-500 ease-in relative hover:shadow-2xl hover:scale-[1.02] group"
    >
      {/* Percentage box  starts here*/}
      <div className=" flex items-center justify-center z-10 gap-2 bg-[#f9fafc] w-fit shadow absolute right-4 top-4 rounded-full px-2 py-1.5">
        <FaDotCircle
          className={`text-sm ${
            resume?.completionPercentage < 30
              ? "text-red-500"
              : "text-green-600"
          } `}
        />
        <p className="text-sm text-zinc-600 font-semibold">
          {resume?.completionPercentage}%
        </p>
        <SlEnergy className="text-sm text-zinc-600 font-semibold" />
      </div>
      {/* Percentage box  ends here */}

      {/* Upper box starts here */}
      <div className="bg-[#e2eefedc] relative flex flex-col items-center py-10 rounded-t-3xl gap-2.5">
        {/* option box starts here */}
        <div className="w-[80%] h-[80%] absolute top-5 bg-gradient-to-t from-white to-transparent rounded-2xl hidden group-hover:flex group-active:flex items-end justify-center gap-4 pb-3">
          <button className="flex items-center justify-center w-12 h-12 rounded-2xl shadow-2xl bg-gradient-to-r from-[#8322fd] to-[#c300e0] hover:scale-110 transition-transform duration-200 ease-in-out">
            <FiEdit className="text-white text-lg font-medium cursor-pointer" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteResumePopUp((prev) => ({
                ...prev,
                value: true,
                resumeId: resume?._id,
              }));
            }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl shadow-2xl bg-[#fd4800] hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            <RiDeleteBinLine className="text-white text-lg font-medium cursor-pointer" />
          </button>
        </div>
        {/* option box ends here */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl bg-white">
          <FiEdit className="text-blue-700 text-2xl font-medium" />
        </div>
        <p className="font-bold text-sm text-[#131212]">
          {resume?.resumeTitle}
        </p>
        <p className="text-xs text-neutral-500 ">
          {resume?.completionPercentage}% Completed
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <p className="bg-[#f2f7ff] text-neutral-600 text-xs rounded-md py-1.5 px-2.5">
            Profile
          </p>
          <p className="bg-[#f2f7ff] text-neutral-600 text-xs rounded-md py-1.5 px-2.5">
            Work
          </p>
          <p className="bg-[#f2f7ff] text-neutral-600 text-xs rounded-md py-1.5 px-2.5">
            Skills
          </p>
          <p className="bg-[#f2f7ff] text-neutral-600 text-xs rounded-md py-1.5 px-2.5">
            Edu
          </p>
        </div>
      </div>
      {/* Upper box ends here */}
      {/* Bottom box  starts here */}
      <div className="p-6 flex flex-col items-start gap-3">
        <h4 className="font-bold text-[#131212]">{resume?.resumeTitle}</h4>
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            <IoIosTimer size={16} /> Created At: {resume?.createdAt}
          </p>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            <IoIosTimer size={16} /> Updated At At: {resume?.updatedAt}
          </p>
        </div>

        <div className="rounded-full w-full h-2 bg-[#e6e7eb]">
          <div
            style={{
              width: `${resume?.completionPercentage || 0}%`,
              backgroundColor:
                resume?.completionPercentage < 30
                  ? "red"
                  : resume?.completionPercentage <= 60
                  ? "orange"
                  : "#02a842",
            }}
            className={`h-full rounded-full bg-[#02a842]`}
          ></div>
        </div>

        <div className="flex items-center justify-between w-full  ">
          <p className="text-xs text-zinc-400 font-medium">Ready to Go!</p>
          <p className="text-xs font-bold text-[#131212d4]">
            {resume?.completionPercentage}% Complete
          </p>
        </div>
      </div>
      {/* Bottom box  ends here */}
    </div>
  );
};

export default ResumeThumbnailCard;
