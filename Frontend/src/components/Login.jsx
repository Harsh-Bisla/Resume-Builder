import { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { userStore } from "../context/userContext";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./Loader";

const Login = ({ setAuthModel, setAuthState }) => {
  const { userLogin, loading } = useContext(userStore);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      userLogin(loginInfo.email, loginInfo.password, setAuthModel);
    }
  };

  const popUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [1, 1.01, 1] },
  };

  return (
    <div className="fixed inset-0 z-10 w-full h-screen flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      {/* Login Modal */}
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-[#f8f7ff] max-w-[400px] w-full rounded-3xl z-30 p-8 flex relative flex-col gap-5 m-2"
      >
        {/* Close Button */}
        <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-4 top-4 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
          <IoCloseOutline
            onClick={() => setAuthModel(false)}
            className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
          />
        </div>

        {/* Rest of the modal content */}
        <h1 className="font-bold text-2xl text-black mx-auto">Welcome Back</h1>
        <p className="text-neutral-600 font-medium -mt-2 mx-auto">
          Sign in to continue building amazing resumes
        </p>

        <div className="flex flex-col items-start gap-2.5 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="email"
            placeholder="example@gmail.com"
            value={loginInfo.email}
            onChange={handleOnChange}
            name="email"
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-col items-start gap-2.5 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="password"
            placeholder="Min 8 characters"
            value={loginInfo.password}
            onChange={handleOnChange}
            name="password"
            onKeyDown={handleKeyDown}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={() =>
              userLogin(loginInfo.email, loginInfo.password, setAuthModel)
            }
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-black py-4 cursor-pointer rounded-2xl hover:scale-105 duration-200 ease-in-out hover:shadow-xl"
          >
            Login
          </button>
        )}

        <p className="mx-auto text-neutral-600 text-sm font-medium">
          Don't have an account?{" "}
          <a
            onClick={() => setAuthState("signup")}
            className="text-purple-600 font-black cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
