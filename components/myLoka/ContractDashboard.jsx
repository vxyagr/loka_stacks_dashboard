import React from "react";
import "tailwindcss/tailwind.css";
import NFTAndClaimableCard from "./NFTAndClaimableCard";
import StatsCard from "./StatsCard";
import ROICard from "./ROICard";
import LargeButton from "../../components/generalComponents/LargeButton";

const ContractDashboard = ({ image }) => {
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[100px] h-full ">
      <div className="w-full flex flex-col lg:w-2/6 bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px] rounded-br-none ">
        <NFTAndClaimableCard image={image} />
      </div>

      <div className="w-full grid lg:w-1/6 py-0 lg:p-0 h-auto lg:border-gray-500 lg:border-r-[1px] ">
        <ROICard />
      </div>
      <div className="w-full grid lg:w-3/6 p-0 lg:border-gray-500 lg:border-l-[1px] lg:border-none  border-[#245366] lg:bg-dashboard-gray bg-dashboard-blue border-[1px] rounded-lg ">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg ">
          <StatsCard />
        </div>
        <div>
          <LargeButton buttonText={"UNSTAKE"} />
        </div>
      </div>
    </div>
  );
};

export default ContractDashboard;
