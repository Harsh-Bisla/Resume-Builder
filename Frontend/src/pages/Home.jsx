import Image from "../assets/home-img.png";
import { motion } from "motion/react";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { userStore } from "../context/userContext";
import { BsArrowRight } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { SlEnergy } from "react-icons/sl";

const Home = () => {
  const navigate = useNavigate();
  const { setAuthModel } = useOutletContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const features = [
    {
      title: "Easy Editing",
      desc: "Update your resume sections with live preview and instant formatting.",
    },
    {
      title: "Beautiful Templates",
      desc: " Choose from modern, professional templates that are easy to customize.",
    },
    {
      title: "One-Click Export",
      desc: " Download your resume instantly as a high-quality with one click",
    },
  ];

  return (
    <>
      {/* Header section starts here */}
      <section className="w-full py-18 px-5 md:px-10 lg:px-22 bg-[#fafbfd]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full">
          <div className="lg:w-1/2 w-[90%]">
            <h1 className="text-purple-700 font-bold bg-gradient-to-r from-[#eee9ff] to-[#fae8fe] px-4 py-2 rounded-full w-fit border-1 border-purple-200 text-sm">
              Professional Resume Builder
            </h1>

            <h1 className="text-6xl sm:text-8xl font-extrabold text-[#0f172a] leading-20 sm:leading-30 my-8">
              Craft <br />{" "}
              <span className="bg-gradient-to-r from-[#8322fd] to-[#fa7835] text-transparent bg-clip-text">
                Professional
              </span>{" "}
              <br /> Resumes
            </h1>
            <p className="text-lg sm:text-xl font-medium leading-8 text-neutral-600">
              Create job-winning resumes with expertly designed templates.
              ATS-friendly, recruiter-approved, and tailored to your career
              goals.
            </p>

            <div className="flex items-center flex-wrap justify-start my-10 gap-3">
              <button
                onClick={() =>
                  localStorage.getItem("token")
                    ? navigate("/dashboard")
                    : setAuthModel(true)
                }
                className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-2xl px-10 py-4 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110 flex items-center gap-1.5 w-full sm:w-fit"
              >
                Start Building <BsArrowRight />
              </button>

              <button
                onClick={() =>
                  localStorage.getItem("token")
                    ? navigate("/dashboard")
                    : setAuthModel(true)
                }
                className="text-base rounded-2xl px-10 py-4 cursor-pointer text-purple-700 font-bold transition-all duration-300 hover:bg-purple-50 hover:border-purple-300 border-2 border-purple-300 w-full sm:w-fit"
              >
                View Templates
              </button>
            </div>

            <div className="flex items-center gap-10 justify-start my-14 sm:my-10">
              <div className="flex flex-col gap-1 items-center">
                <p className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-transparent bg-clip-text">
                  50K+
                </p>
                <p className="text-sm text-neutral-500 font-medium">
                  Resumes Created
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-2xl sm:text-4xl flex items-center font-extrabold bg-gradient-to-r from-[#ff6200] to-[#fc3a2f] text-transparent bg-clip-text">
                  4.9 <IoIosStar className="text-[#fc3a2f]" />
                </p>
                <p className="text-sm text-neutral-500 font-medium">
                  User Rating
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#03bb82] to-[#00bba6] text-transparent bg-clip-text">
                  5 Min
                </p>
                <p className="text-sm text-neutral-500 font-medium">
                  Build Time
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full sm:w-[80%] lg:w-1/2">
            <img
              className="w-[70%] shadow-[0_0_120px_20px_rgba(216,150,255,0.35)]"
              src={Image}
              alt="home-image"
            />
          </div>
        </div>
      </section>
      {/* Header section ends here */}

      {/* Features section starts here */}
      <section className="w-full flex flex-col min-h-screen py-12 bg-[#f7f3ff] px-2 sm:px-10">
        <h1 className="mx-auto text-center text-3xl sm:text-5xl font-extrabold">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#8322fd] to-[#c400df] text-transparent bg-clip-text">
            ResumeXpert?
          </span>
        </h1>
        <p className="mx-auto text-center sm:text-start text-neutral-600 text-lg my-5">
          Everything you need to create a professional resume that stands out
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-2 sm:mx-5 mt-14">
          <div className="flex flex-col items-start gap-4  rounded-3xl p-8 bg-[#f7f3ff] hover:shadow-[0_0_30px_5px_rgba(100,149,237,0.4)] hover:scale-105 transition-all duration-200 ease-in-out">
            <div
              className="flex items-center justify-center shadow
             w-20 h-20 rounded-2xl bg-[#9148fe]"
            >
              <SlEnergy className="text-4xl text-white" />
            </div>
            <p className="text-2xl font-extrabold">Lightning Fast</p>
            <p className="text-neutral-700 font-medium">
              Create professional resumes in under 5 minutes with our
              streamlined process
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-3xl p-8 bg-[#fdf3fd] hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-[0_0_20px_3px_rgba(187,0,228,0.25)]">
            <div
              className="flex items-center justify-center shadow
             w-20 h-20 rounded-2xl bg-[#e327c8]"
            >
              <SlEnergy className="text-4xl text-white" />
            </div>
            <p className="text-2xl font-extrabold">Pro Templates</p>
            <p className="text-neutral-700 font-medium">
              Choose from dozens of recruiter-approved, industry-specific
              templates
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-3xl shadow-2xs hover:shadow-[0_0_30px_5px_rgba(255,192,203,0.4)] p-8 bg-[#fef5f0] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
            <div
              className="flex items-center justify-center shadow
             w-20 h-20 rounded-2xl bg-[#fd5800]"
            >
              <SlEnergy className="text-4xl text-white" />
            </div>
            <p className="text-2xl font-extrabold">Instant Export</p>
            <p className="text-neutral-700 font-medium">
              Download high-quality PDFs instantly with perfect formatting
            </p>
          </div>
        </div>
      </section>
      {/* Features section ends here */}

      {/* Bottom section starts here */}
      <section className="flex items-center justify-center w-full h-screen">
        <div className="max-w-[800px] w-full flex flex-col py-8 sm:py-14 border mx-4 border-zinc-200 rounded-3xl shadow-[0_0_120px_20px_rgba(216,150,255,0.35)] px-2">
          <h4 className="text-center text-3xl sm:text-5xl font-extrabold">
            Ready to Build Your{" "}
            <span className="bg-gradient-to-r from-[#8322fd] to-[#c400df] text-transparent bg-clip-text">
              Standout Resume?
            </span>
          </h4>
          <p className="text-neutral-600 text-lg my-5 text-center">
            Join thousands of professionals who landed their dream jobs with our
            platform
          </p>
          <button
            onClick={() =>
              localStorage.getItem("token")
                ? navigate("/dashboard")
                : setAuthModel(true)
            }
            className="mx-auto bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-lg rounded-2xl px-10 py-4 my-4 cursor-pointer text-white font-bold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110"
          >
            Start Building Now
          </button>
        </div>
      </section>
      {/* Bottom section ends here */}
    </>
  );
};

export default Home;
