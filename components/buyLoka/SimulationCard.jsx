import React from "react";
import "tailwindcss/tailwind.css";
import GraphCard from "../../components/buyLoka/GraphCard";
import Slider from "../../components/generalComponents/Slider";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
Chart.defaults.color = "#FFFFFF";
const SimulationCard = () => {
  return (
    <div className="px-5 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Simulation : $3000 for 6 months
        </div>
        <div className="w-full flex flex-col min-h-[500px]  bg-dashboard-blue p-2 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-2 ">
            <div className="w-full min-h-[300px] p-0 flex justify-start items-left text-center lexend-light text-white">
              <GraphCard />
            </div>
            <div className="w-full p-2 flex justify-start items-left text-center lexend-light">
              <Slider />
            </div>
            <div className="w-full p-2 flex justify-center items-center text-center hero-lexend text-white">
              <div className="w-full p-0 flex flex-wrap justify-center items-center text-center lexend-light">
                <div className=" bg-dashboard-gray lg:min-w-[200px] min-w-[120px] flex rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base">
                  LOKA
                </div>
                <div className="  flex rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base">
                  VS
                </div>
                <div className=" bg-dashboard-gray lg:min-w-[200px] min-w-[120px] flex rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base">
                  Exchange
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default SimulationCard;
