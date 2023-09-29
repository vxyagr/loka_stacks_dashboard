import React from "react";
import "tailwindcss/tailwind.css";

const MiningDashboard = () => {
  const calculateBTCStats = () => {};
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px] ">
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-[#09A668] font-lg">
          24 hrs yield
        </div>
        <div className="text-white text-center text-3xl">TBA</div>
        <div className="text-white w-full text-center justify-start items-center">
          <div className="text-white flex-wrap inline-block text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px]">
            $TBA
          </div>
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-[#09A668] font-lg">
          Miners Online
        </div>
        <div className="text-white text-center text-3xl">TBA</div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Difficulty
        </div>
        <div className="text-[#09A668] text-center text-xl">TBA </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4 bg-dashboard-blue rounded-lg border-[#245366] border-[1px]">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Total BTC Distributed
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

export default MiningDashboard;
