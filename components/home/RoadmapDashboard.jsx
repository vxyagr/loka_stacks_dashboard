// components/MiningDashboard.js
import React from "react";

const RoadmapDashboard = () => {
  return (
    <div className="p-0 rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px]">
      <div className="w-full flex flex-col lg:w-2/4 bg-dashboard-blue p-4 rounded-lg ">
        <div className="w-full p-2 text-center  text-white font-medium">
          Roadmap
        </div>
        <div className="text-white text-center">coming soon</div>
      </div>
      <div className="w-full flex flex-col lg:w-2/4 p-4">
        <div className="w-full p-2 text-center  text-white font-medium">
          Events
        </div>
        <div className="text-white text-center">coming soon</div>
      </div>
    </div>
  );
};

export default RoadmapDashboard;
