import { GoDownload } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumePreview = ({ data, setPreviewPopUp, RenderResume, title }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [0.8, 1.02, 1] },
  };

  const downloadResumeAsPDF = async (title = "resume") => {
    const resumeElement = document.getElementById("resume-to-download");

    if (!resumeElement) return;
    resumeElement.style.display = "block";
    await new Promise((resolve) => setTimeout(resolve, 100));

    html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      // For multi-page support
      if (imgHeight < pageHeight) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      } else {
        while (position < imgHeight) {
          pdf.addImage(
            imgData,
            "PNG",
            0,
            position ? -position : 0,
            imgWidth,
            imgHeight
          );
          position += pageHeight;
          if (position < imgHeight) pdf.addPage();
        }
      }

      pdf.save(`${title}.pdf`);

      // Hide it again
      resumeElement.style.display = "none";
    });
  };

  return (
    <section className="fixed  inset-0 z-10 w-full h-screen  flex items-center justify-center">
      {/* Blurred overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

      {/* main content starts here */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-30 rounded-3xl h-[95vh]  overflow-y-scroll bg-white max-w-[850px] w-full"
      >
        {/* Header box starts here */}
        <div className="flex items-center justify-between gap-2.5 p-6 sticky top-0 bg-gradient-to-r from-white to-[#f3f1fe] shadow flex-wrap">
          <h2 className="font-extrabold text-lg">{title}</h2>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={downloadResumeAsPDF}
              className="bg-gradient-to-r from-[#8322fd] to-[#c300e0] text-base rounded-2xl px-5 py-3 flex items-center justify-center gap-2.5 cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#c300e0] hover:to-[#8322fd] hover:scale-110"
            >
              <GoDownload className="text-lg" />
              Download PDF
            </button>
            <div
              onClick={() => setPreviewPopUp(false)}
              className="w-9 h-9 bg-white cursor-pointer rounded-xl shadow flex items-center justify-center absolute right-2 top-2 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group"
            >
              <IoCloseOutline className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200" />
            </div>
          </div>
        </div>
        {/* Header box ends here */}

        {/* Completion Badge */}
        <div className="bg-[#f4f4f4]">
          <div className="rounded-full px-2.5 py-1.5 flex items-center gap-1.5 justify-center bg-[#ede9ff] w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
            <p className="text-sm text-purple-700">
              Completion: {data.completionPercentage}%
            </p>
          </div>
        </div>
        {/* Completion Badge ends here */}

        {/* Preview box */}
        <div className="p-4 bg-[#f4f4f4] pt-12">{RenderResume()}</div>

        <div
          id="resume-to-download"
          className="hidden"
          style={{ padding: "20px", backgroundColor: "white" }}
        >
          {RenderResume()}
        </div>
      </motion.div>
      {/* main content ends here */}
    </section>
  );
};

export default ResumePreview;
