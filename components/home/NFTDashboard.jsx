import React from "react";
import "tailwindcss/tailwind.css";

const NFTDashboard = () => {
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px] ">
      <div className="w-full flex flex-col lg:w-1/4 bg-dashboard-blue p-4 rounded-lg border-[#245366] border-[1px] ">
        <div className="flex flex-col items-stretch w-full p-5 ">
          <div className="w-full p-2  text-white font-medium">
            Claimable Bitcoin
          </div>
          <div className="w-full p-2 flex justify-between items-center">
            <div className="text-5xl font-bold text-white w-full lg:text-right">
              TBA
            </div>
            <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-sm">
              ckBTC
            </div>
          </div>
          <button className="w-full p-2 text-yellow-400  rounded-md transition duration-300 ease-in-out hover:shadow-lg">
            $TBA
          </button>
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-[#09A668] font-lg">
          Loka Contracts
        </div>
        <div className="text-white text-center text-3xl">TBA</div>
        <div className="text-white w-full text-center justify-start items-center">
          <div className="text-white flex-wrap inline-block text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px]">
            $TBA invested
          </div>
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Status
        </div>
        <div className="text-[#09A668] text-center text-xl">TBA active</div>
        <div className="text-[#f5a405] text-center">TBA staked</div>
        <div className="text-white text-center">TBA expired</div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Total BTC Claimed
        </div>
        <div className="text-white text-center text-2xl">TBA</div>
        <div className="text-white text-center">
          <div className="text-white flex-wrap inline-block text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px]">
            $TBA
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDashboard;
