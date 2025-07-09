import { motion } from "motion/react";
import { useContext } from "react";
import { userStore } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setAuthModel }) => {
  const { user, logoutUser } = useContext(userStore);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-5 md:px-12 2xl:px-20 py-5 border-b border-b-neutral-100 bg-[#fefefe] sticky top-0 z-10">
      <motion.h1
      onClick={()=>navigate("/")}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="text-2xl font-extrabold cursor-pointer bg-clip-text bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-transparent"
      >
        Resume Builder
      </motion.h1>

      {!localStorage.getItem("token") ? (
        <motion.button
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          onClick={() => setAuthModel(true)}
          className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-xl px-6 py-2.5 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110"
        >
          Get Started
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="flex items-center justify-center gap-2.5 bg-white rounded-xl shadow-2xl px-2 py-4 max-w-40 w-full absolute right-4 top-2"
        >

          <div className="bg-gradient-to-r from-[#994fff] to-[#c73efe] hover:bg-gradient-to-r hover:from-[#c73efe] hover:to-[#c73efe] text-white font-bold text-lg px-4 py-2 rounded-lg">
            H
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-md font-bold">{user?.fullName}</h4>
            <button
              onClick={logoutUser}
              className="text-sm cursor-pointer text-purple-700 font-semibold"
            >
              Logout
            </button>
          </div>
        </motion.div>

      )}
    </nav>
  );
};

export default Navbar;
