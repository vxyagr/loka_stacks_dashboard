import React from "react";
import "tailwindcss/tailwind.css";
import GraphCard from "../../components/buyLoka/GraphCard";
import Slider from "../../components/generalComponents/Slider";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
Chart.defaults.color = "#93a5bf";
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
            <div className="w-full p-2 flex-row justify-center   items-center text-center hero-lexend rounded-xl text-[#FACC15]">
              <div className="w-full p-4">
                {" "}
                Comparison for $3000 of investment after 1 year
              </div>
              <div className="p-0 w-full justify-center items-center align-top text-center rounded-lg flex flex-col md:flex-row h-full">
                <div className="w-full flex flex-col lg:w-2/5 p-2 border-[#79D5C6] border-[1px] rounded-xl bg-dashboard-gray">
                  <div className="w-full p-2 text-center  text-white font-medium">
                    LOKA
                  </div>
                  <div className="text-white text-center text-xl">$4500</div>
                  <div className="text-white text-center text-lg">40% APR</div>
                </div>
                <div className="flex flex-col w-1/5  p-4">
                  <div className="w-full p-2 text-center  text-white font-medium">
                    vs
                  </div>
                </div>
                <div className="flex flex-col w-full lg:w-2/5 p-2 border-[#79D5C6] border-[1px] rounded-xl bg-dashboard-gray">
                  <div className="w-full p-2 text-center  text-white font-medium">
                    EXCHANGE
                  </div>
                  <div className="text-white text-center text-xl">$4000</div>
                  <div className="text-white text-center text-lg">10% APR</div>
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
