import { IoIosInformationCircleOutline } from "react-icons/io";

const PersonalInfoForm = ({ data, setData, errors }) => {
  return (
    <div>
      <h1 className="font-extrabold text-2xl">Personal Information</h1>

      <div className="flex items-center justify-between w-full mt-4 gap-3">
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Enter Name"
            id="fullName"
            value={data?.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="designation"
          >
            Designation
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Enter Designation"
            id="designation"
            value={data?.designation}
            onChange={(e) => setData({ ...data, designation: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 my-5 group">
        <label
          className="font-semibold text-[15px] group-focus-within:text-red-600"
          htmlFor="summary"
        >
          Summary
        </label>
        <textarea
          placeholder="Describe about yourself."
          rows={4}
          className="w-full outline-0 rounded-xl border-2 mb-1.5 border-red-100 px-2.5 py-3 bg-white font-medium focus:outline-red-200 focus:outline-4 focus:border-red-400 transition-all duration-200 ease-in-out resize-none "
          name="summary"
          id="summary"
          value={data?.summary}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
        ></textarea>
        {/* Error message starts here */}
        {Object.keys(errors).length > 0 && (
          <div className="flex my-2 items-center justify-start gap-1.5 max-w-[450px] w-full border border-amber-400 rounded-xl p-4 mx-auto bg-[#fefbea]">
            <IoIosInformationCircleOutline className="text-[#ab764e]" />
            <p className="text-sm text-[#ab764e]">
              {errors.fullName}, {errors.designation}, {errors.summary}.
            </p>
          </div>
        )}

        {/* Error message ends here */}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
