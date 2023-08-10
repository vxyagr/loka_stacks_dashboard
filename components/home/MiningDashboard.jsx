// components/MiningDashboard.js
import React from "react";

const MiningDashboard = () => {
  return (
    <div className="p-0 rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px]">
      <div className="w-full flex flex-col lg:w-1/4 bg-dashboard-blue p-4 rounded-lg ">
        <div className="w-full p-2  text-white font-medium">24 hr yield</div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="flex-1 text-6xl font-bold text-white text-right">
            3
          </div>
          <div className=" flex-1  ">
            <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-sm text-left max-w-[60px]">
              BTC
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-white font-medium">
          24h
        </div>
        <div className="text-white text-center">coming soon</div>
      </div>
      <div className="w-full flex flex-col lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-white font-medium">
          Hashrate
        </div>
        <div className="text-white text-center">coming soon</div>
      </div>
      <div className="w-full flex flex-col lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-white font-medium">
          ROI
        </div>
        <div className="text-white text-center">coming soon</div>
      </div>
    </div>
  );
};

export default MiningDashboard;
