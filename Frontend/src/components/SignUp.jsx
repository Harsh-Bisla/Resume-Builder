import { IoCloseOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { userStore } from "../context/userContext";
import Loader from "./Loader";

const SignUp = ({ setAuthModel, setAuthState }) => {
  const { userSignup, loading } = useContext(userStore);

  const [signUpInfo, setSignUpInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      userSignup(signUpInfo, "", setAuthModel);
    }
  };

  return (
    <div className="fixed inset-0 z-10 w-full h-screen flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      {/* Login Modal */}
      <div className="bg-gradient-to-r from-white to-[#fff3f3] max-w-[410px] w-full rounded-3xl z-30 px-8 py-5 flex relative flex-col gap-5 m-2">
        {/* Close Button */}
        <div className="w-9 h-9 bg-white cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-4 top-4 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
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
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            id="fulName"
            placeholder="Harsh Bisla"
            value={signUpInfo.fullName}
            onChange={handleInfoChange}
            name="fullName"
            onKeyDown={handleKeyDown}
          />
        </div>

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
            value={signUpInfo.email}
            onChange={handleInfoChange}
            name="email"
            onKeyDown={handleKeyDown}
            id="email"
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
            value={signUpInfo.password}
            onChange={handleInfoChange}
            name="password"
            onKeyDown={handleKeyDown}
            id="password"
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={() => userSignup(signUpInfo, "", setAuthModel)}
            className="bg-gradient-to-r from-[#fd1d5b] to-[#e70076] text-white text-lg font-black py-3 cursor-pointer rounded-2xl hover:scale-105 duration-200 ease-in-out hover:shadow-xl"
          >
            Create Account
          </button>
        )}

        <p className="mx-auto text-neutral-600 text-sm font-medium">
          Alredy have an account?{" "}
          <a
            onClick={() => setAuthState("login")}
            className="text-[#e70076] font-black cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
