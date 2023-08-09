import React from "react";
import "tailwindcss/tailwind.css";

const NFTDashboard = () => {
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px]">
      {/* {/*<div className="flex flex-col items-stretch w-full bg-dashboard-blue rounded-lg overflow-hidden min-w-[200px]">
      <div className="flex flex-col items-stretch w-full p-5 ">
        <div className="w-full p-2  text-white font-medium">My Bitcoin</div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="text-5xl font-bold text-white">0.3</div>
          <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-sm">
            BTC
          </div>
        </div>
        <button className="w-full p-2 bg-yellow-500 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg">
          Claim
        </button>
      </div>
      <div className="w-4/5 h-px bg-gray-400 mx-auto my-0 ml-0"></div>
      <div className="w-full p-4  text-white">
        <div className="w-full p-2  text-white font-medium">My Loka</div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="text-5xl font-bold text-white">12</div>
          <div className="bg-green-800 rounded-md px-2 py-0 m-4 text-white text-sm">
            LOKA
          </div>
        </div>
      </div>
      <div className="w-4/5 h-px bg-gray-400 mx-auto my-0 ml-0"></div>
      <div className="w-full p-4  text-white">
        <div className="w-full p-2  text-white font-medium">Buy More Loka</div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="text-5xl font-bold text-white">-</div>
          <div className="text-5xl font-bold text-white">0</div>
          <div className="text-5xl font-bold text-white">+</div>
        </div>
        <button className="w-full p-2 bg-green-500 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg">
          Coming Soon
        </button>
      </div>
    </div> */}

      <div className="w-full flex flex-col lg:w-1/4 bg-dashboard-blue p-4 rounded-lg ">
        <div className="flex flex-col items-stretch w-full p-5 ">
          <div className="w-full p-2  text-white font-medium">
            Claimable Bitcoin
          </div>
          <div className="w-full p-2 flex justify-between items-center">
            <div className="text-5xl font-bold text-white w-full text-right">
              0.3
            </div>
            <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-sm">
              sBTC
            </div>
          </div>
          <button className="w-full p-2 text-yellow-400  rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg">
            $9,000
          </button>
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

export default NFTDashboard;
