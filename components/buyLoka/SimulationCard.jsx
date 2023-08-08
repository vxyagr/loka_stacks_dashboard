import React from "react";
import "tailwindcss/tailwind.css";
import GraphCard from "../../components/buyLoka/GraphCard";
import Slider from "../../components/generalComponents/Slider";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Logo from "../Logo";

Chart.register(CategoryScale);
Chart.defaults.color = "#93a5bf";
const SimulationCard = () => {
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(0);

  return (
    <div className="p-5 pb-0 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-2   ">
          Simulation : $3000 for 1 year
        </div>
        <div className="w-full flex flex-col min-h-[500px]  bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px] ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full min-h-[300px] p-4  rounded-t-lg pb-4 flex justify-start items-left  text-center lexend-light text-white ">
              <div className="p-4 w-full bg-[#1b3a61] rounded-lg border-[#2f5381] border-[1px]">
                <GraphCard />
              </div>
            </div>
            <div className=" w-full p-0 flex justify-start items-left text-center lexend-light">
              <Slider />
            </div>
            <div className="w-full p-2 flex-row justify-center   items-center text-center hero-lexend rounded-xl text-[#FACC15]">
              <div className="w-full p-4">
                {" "}
                Comparison for $3000 of investment after 1 year
              </div>
              <div className="w-full flex flex-col p-0 rounded-lg pb-4 ">
                <div className="flex flex-col items-stretch w-full p-0 ">
                  <div className="w-full p-0 flex flex-col justify-center items-center lexend-light">
                    <div className="w-full p-0 flex flex-wrap justify-center items-center text-center lexend-light">
                      <div className="border-r-[1px] border-[#8195B0] grid bg-dashboard-blue  min-w-[48%]  px-2 pr-0 py-2  justify-center items-center text-white text-center text-xs lg:text-base">
                        <div className="text-xl lg:text-2xl pb-4">
                          <Logo />
                        </div>
                        <div className="text-2xl lg:text-3xl text-[#FACC15] font-bold">
                          $4,200
                        </div>
                        <div className="text-xl lg:text-2xl">40% APR</div>
                      </div>
                      <div className=" bg-dashboard-blue grid min-w-[48%]   px-2 pl-0 py-2  justify-center items-center text-white text-center text-xs lg:text-base">
                        <div className="text-xl lg:text-2xl pb-4">EXCHANGE</div>
                        <div className="text-2xl lg:text-3xl text-[#FACC15] font-bold">
                          $3,000
                        </div>
                        <div className="text-xl lg:text-2xl">0% APR</div>
                      </div>
                    </div>
                  </div>
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
