import { IoCloseOutline } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
import { motion } from "motion/react";

const ThemeComponent = ({
  setThemePopUp,
  templates,
  RenderResume,
  setSelectedTemplate,
  selectedTemplate,
}) => {
  const popUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [1, 1.01, 1] },
  };

  return (
    <section className="fixed  inset-0 z-10 w-full h-screen  flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative bg-[#f4f4f4] z-20 max-w-[95vw] w-full h-[95vh] rounded-2xl overflow-scroll"
      >
        <div className="flex items-center justify-between rounded-t-2xl  bg-gradient-to-r from-white to-[#f5f3ff]">
          <h1 className="font-bold text-xl shadow-xs p-7 w-full">
            Change Theme
          </h1>
          <div
            onClick={() => setThemePopUp(false)}
            className="w-9 h-9 bg-white cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-4 top-4 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group"
          >
            <IoCloseOutline className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 flex items-center justify-between mx-5">
          <button className="font-bold text-purple-600 text-sm py-3 shadow-2xl px-6 bg-gradient-to-r from-[#f5eefe] to-[#fceafe] rounded-lg">
            Templates
          </button>
          <button
            onClick={() => setThemePopUp(false)}
            className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-2xl px-6 py-5 cursor-pointer text-white font-bold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110 flex items-center justify-center gap-1.5"
          >
            <FiCheck /> Apply Changes
          </button>
        </div>

        <section className="flex items-start flex-col-reverse lg:flex-row justify-between gap-4 m-5 ">
          <div className="w-full relative lg:w-1/2 h-screen overflow-scroll flex  flex-wrap gap-2.5 justify-start items-start bg-white rounded-2xl p-5">
            {templates?.map((template, idx) => (
              <div className="relative">
                <img
                  onClick={() => setSelectedTemplate(template.templateId)}
                  key={idx}
                  className="w-42 h-72 border-2 border-zinc-200 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                  src={template.image}
                  alt="template-image"
                />
                {selectedTemplate === template.templateId && (
                  <div className="absolute top-0 opacity-30 bg-purple-400 h-72 w-42 rounded-2xl"></div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-white rounded-2xl h-screen overflow-scroll">
            {RenderResume()}
          </div>
        </section>
      </motion.div>
    </section>
  );
};

export default ThemeComponent;
