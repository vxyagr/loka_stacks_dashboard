// components/MiningDashboard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCopy } from "@fortawesome/free-solid-svg-icons";
const WhitelistDashboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText("yolo");
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="p-0 rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px]">
      <div className="w-full flex flex-col  bg-dashboard-blue p-4 rounded-lg ">
        <div className="w-full p-2 text-center  text-white font-sm">
          Kindly note that the current dashboard data is temporarily sourced
          from an external Bitcoin miner. As we set up Loka mining operations,
          the data will be updated accordingly.{" "}
        </div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="flex-1 text-md font-bold text-white text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default WhitelistDashboard;
