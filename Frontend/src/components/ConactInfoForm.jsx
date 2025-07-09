import { IoIosInformationCircleOutline } from "react-icons/io";

const ConactInfoForm = ({ data, setData, errors }) => {
  return (
    <div className="px-5 flex flex-col gap-2">
      <h1 className="font-extrabold text-2xl">Contact Information</h1>

      <div className="flex flex-col gap-3 mt-4 group">
        <label
          className="font-semibold text-[15px] group-focus-within:text-purple-700"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
          type="text"
          placeholder="Address"
          id="address"
          value={data?.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between w-full my-4 gap-3">
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Enter Email"
            id="email"
            value={data?.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Phone Number"
            id="phone"
            value={data?.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full my-8 gap-3">
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="linkedin"
          >
            LinkedIn
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="https://www.linked.in/user"
            id="linkedin"
            value={data?.linkedIn}
            onChange={(e) => setData({ ...data, linkedIn: e.target.value })}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1 group">
          <label
            className="font-semibold text-[15px] group-focus-within:text-purple-700"
            htmlFor="github"
          >
            GitHub
          </label>
          <input
            className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
            type="text"
            placeholder="https://github.com/user"
            id="github"
            value={data?.github}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 my-5 group">
        <label
          className="font-semibold text-[15px] group-focus-within:text-purple-700"
          htmlFor="summary"
        >
          Portfolio / Website
        </label>
        <input
          className="w-full outline-0 rounded-xl border-2 mb-1.5 border-neutral-300 px-2.5 py-3 bg-[#f9fafc] font-medium focus:outline-purple-200 focus:outline-4 focus:border-purple-500 transition-all duration-200 ease-in-out"
          type="text"
          placeholder="https://portfolio.vercel.com"
          value={data?.portfolio}
          onChange={(e) => setData({ ...data, portfolio: e.target.value })}
        />
      </div>
        {/* Error message starts here */}
              {Object.keys(errors).length > 0 && (
                <div className="flex my-2 items-center justify-start gap-1.5 max-w-[450px] w-full border border-amber-400 rounded-xl p-4 mx-auto bg-[#fefbea]">
                  <IoIosInformationCircleOutline className="text-[#ab764e]" />
                  <p className="text-sm text-[#ab764e]">
                    {errors.address}, {errors.email}, {errors.phone}, {errors.linkedIn}, {errors.github}, {errors.portfolio}.
                  </p>
                </div>
              )}
      
              {/* Error message ends here */}
    </div>
  );
};

export default ConactInfoForm;
