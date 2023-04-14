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
      <div className="w-full flex flex-col lg:w-1/2 bg-dashboard-blue p-4 rounded-lg ">
        <div className="w-full p-2  text-white font-sm">
          To enter the whitelist : <br />
          <br />
          1. copy and post the provided text to twitter
          <br />
          2. copy and paste the twitter post URL to the provided field this page
          <br />
          3. check for whitelist eligibility
        </div>
        <div className="w-full p-2 flex justify-between items-center">
          <div className="flex-1 text-md font-bold text-white text-center"></div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:w-1/2 p-4">
        <div className="w-full p-2 text-left  text-white font-small">
          Get ready to LOKA and load! <br />
          Introducing Loka, your next-gen Web3 sidekick for Bitcoin mining using
          a low cost, green, and renewable energy Join the Loka Revolution
          today! Follow @lokaversenft
          <br />
          <FontAwesomeIcon
            icon={faCopy}
            onClick={handleCopyClick}
            style={{ cursor: "pointer" }}
          />
          {isCopied ? (
            <span className="ml-2">Copied!</span>
          ) : (
            <span className="ml-2"></span>
          )}
        </div>
        <div className="text-white text-left">
          <label htmlFor="text-input">Twitter post URL : </label>
          <input
            id="text-input"
            type="text"
            className="rounded-md min-w-[300px] text-black p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default WhitelistDashboard;
