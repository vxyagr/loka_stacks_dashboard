import React from "react";
import "tailwindcss/tailwind.css";
import NFTAndClaimableCard from "./NFTAndClaimableCard";
import ROICard from "./ROICard";

const ContractDashboard = () => {
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px] ">
      <div className="w-full flex flex-col lg:w-2/6 bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px] rounded-br-none ">
        <NFTAndClaimableCard />
      </div>

      <div className="w-full grid lg:w-1/6 p-0 h-auto">
        <ROICard />
      </div>
      <div className="w-full grid lg:w-3/6 p-0 border-gray-500 lg:border-l-[1px]">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Total BTC Claimed
        </div>
        <div>STAKE</div>
      </div>
    </div>
  );
};

export default ContractDashboard;
