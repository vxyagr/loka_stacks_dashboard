import React from "react";
import "tailwindcss/tailwind.css";

const AmountCard = () => {
  return (
    <div className="lg:p-5 p-2 w-full rounded-lg  md:flex-row min-h-[100px] ">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Enter your investment amount
        </div>
        <div className="w-full flex flex-col  bg-dashboard-blue p-2 rounded-2xl ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-2 flex justify-center items-center lexend-light ">
              <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-base">
                -
              </div>
              <div className="lg:text-3xl text-2xl  text-white lg:min-w-[100px] min-w-[80px] text-center hero-lexend">
                $3,000
              </div>
              <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-base">
                +
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AmountCard;
