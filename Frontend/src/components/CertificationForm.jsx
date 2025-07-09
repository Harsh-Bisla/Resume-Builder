import { IoAdd, IoCloseOutline } from "react-icons/io5";

const CertificationForm = ({ certifications, setData }) => {
  // function to add certifications
  const handleAddCertificate = () => {
    setData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, { title: "", issuer: "", year: "" }],
    }));
  };

  // function to delete certifications
  const handleDeleteCertificateForm = (idx) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, index) => index !== idx),
    }));
  };

  // fucntion to change the value of the certificates
  const handleChangeValues = (idx, newValue) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((crt, index) =>
        index === idx ? { ...crt, ...newValue } : crt
      ),
    }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-2xl">Certifications</h1>

      {certifications?.map((certificate, idx) => (
        <div
          key={idx}
          className="relative w-full my-5 shadow rounded-2xl p-2.5 flex flex-col gap-6"
        >
          {certifications?.length > 1 && (
            <div className="w-9 h-9 cursor-pointer rounded-xl shadow flex items-center justify-center absolute bg-white right-0 top-0 hover:scale-110 duration-200 ease-in-out hover:bg-red-50 group">
              <IoCloseOutline
                onClick={() => handleDeleteCertificateForm(idx)}
                className="font-bold text-neutral-400 text-2xl group-hover:text-red-600 duration-200"
              />
            </div>
          )}

          <div className="flex items-center w-full gap-2">
            <div className="flex flex-col gap-2.5 w-1/2 group">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor={`certificateTitle-${idx}`}
              >
                Certificate Title
              </label>
              <input
                type="text"
                placeholder="Certificate Title"
                id={`certificateTitle-${idx}`}
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                value={certificate.title}
                onChange={(e) =>
                  handleChangeValues(idx, { title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2.5 w-1/2 group">
              <label
                className="font-semibold text-[15px] group-focus-within:text-purple-700"
                htmlFor={`issuer-${idx}`}
              >
                Issuer
              </label>
              <input
                className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="Issuer"
                id={`issuer-${idx}`}
                value={certificate.issuer}
                onChange={(e) =>
                  handleChangeValues(idx, { issuer: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 group">
            <label
              className="font-semibold text-[15px] group-focus-within:text-purple-700"
              htmlFor={`year-${idx}`}
            >
              Year
            </label>
            <input
              className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
              type="text"
              placeholder="Year"
              id={`year-${idx}`}
              value={certificate.year}
              onChange={(e) =>
                handleChangeValues(idx, { year: e.target.value })
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAddCertificate}
        className="bg-gradient-to-r from-[#00bc7f] to-[#00bba6] text-sm rounded-xl px-7 py-3.5 cursor-pointer text-white font-extrabold transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#00bba6] hover:to-[#00bc7f] my-10 hover:scale-110 flex items-center gap-1"
      >
        {" "}
        <IoAdd /> Add Certificate
      </button>
    </div>
  );
};

export default CertificationForm;
