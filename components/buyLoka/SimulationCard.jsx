import React from "react";
import "tailwindcss/tailwind.css";
import ContractCalculatorAndChart from "./ContractCalculatorAndChart";
import Slider from "../../components/generalComponents/Slider";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Logo from "../generalComponents/Logo";

Chart.register(CategoryScale);
Chart.defaults.color = "#93a5bf";
const SimulationCard = () => {
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const currentBTCSimulated = useSelector(
    (state) => state.rootReducer.btcSimulated
  );

  const currentDurationValue = useSelector(
    (state) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state) => state.rootReducer.durationTitle
  );
  const btcPriceToday = useSelector((state) => state.rootReducer.btcPriceToday);
  const miningResult = useSelector((state) => state.rootReducer.miningResult);
  const exchangeResult = useSelector(
    (state) => state.rootReducer.exchangeResult
  );
  const powerPerDay = useSelector(
    (state) => state.rootReducer.electricityPerDay
  );
  const electricityCostPerKwh = useSelector(
    (state) => state.rootReducer.electricityCostPerKwh
  );

  const currentBTC = useSelector((state) => state.rootReducer.btcPriceToday);

  const [currentMiningResult, setCurrentMiningResult] = useState(0);
  const [currentExchangeResult, setCurrentExchangeResult] = useState(0);
  useEffect(() => {
    setCurrentExchangeResult(exchangeResult);
    setCurrentMiningResult(miningResult);
    //console.log("rsult " + miningResult + " " + exchangeResult);
  }, [miningResult, exchangeResult, btcPriceToday]);

  const [btcUSD, setBtcUSD] = useState(currentBTC);
  useEffect(() => {
    setBtcUSD(currentBTCSimulated);
    //console.log("btc slide " + currentBTCSimulated);
  }, [currentBTCSimulated, currentBTC]);

  const [investmentValue, setInvestmentValue] = useState(0);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
  }, [currentInvestmentValue]);

  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
    //console.log("duration " + durationValue);
  }, [currentDurationValue, currentDuration]);

  function calculateBudgetSplit(budget, duration) {
    // Define constants for artist fee per day and tool fee per artist
    const HashrateRentPerday = 100;
    const electricityPerKwh = 50;

    // Calculate the number of artists needed based on duration
    const numberOfHashrate = Math.ceil(
      budget / (HashrateRentPerday * duration)
    );

    // Calculate artist fee and tool fee
    const hashrateFee = HashrateRentPerday * numberOfHashrate * duration;
    const electricityFee = electricityPerKwh * numberOfArtists;

    return { hashrateFee, electricityFee };
  }

  return (
    <div className="p-5 lg:pl-10 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0   ">
          Simulation
        </div>
        <div className="w-full flex flex-col min-h-[500px]  bg-dashboard-blue p-4 rounded-lg border-[#245366] border-[1px] ">
          <div className="flex  w-full p-2 text-lg  text-[#FACC15]  text-center justify-center items-center ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(investmentValue)}{" "}
            <span className="text-white px-2"> Investment for </span> {duration}
          </div>
          <div className="flex flex-col  w-full p-0 justify-center items-center text-center ">
            <div className="p-2 w-full bg-[#1b3a61] rounded-lg border-[#2f5381] border-[1px] max-w-[98%] min-h-[300px] justify-center items-center text-center">
              <ContractCalculatorAndChart
                btcPrice={currentBTC}
                investment={investmentValue}
                btcPriceSimulation={currentBTCSimulated}
              />
            </div>

            <div className=" w-full p-0 flex justify-start items-left text-center lexend-light">
              <Slider />
            </div>
            <div className="w-full p-2 flex-row justify-center   items-center text-center hero-lexend rounded-xl text-[#FACC15]">
              <div className="w-full p-4">
                {" "}
                Comparison for{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(investmentValue)}{" "}
                of investment after {duration}
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
                          ${currentMiningResult.toFixed(2)}
                        </div>
                        <div className="text-xl lg:text-xl">
                          {(
                            ((currentMiningResult - investmentValue) /
                              investmentValue) *
                            100
                          ).toFixed(2)}
                          % ROI
                        </div>
                      </div>
                      <div className=" bg-dashboard-blue grid min-w-[48%]   px-2 pl-0 py-2  justify-center items-center text-white text-center text-xs lg:text-base">
                        <div className="text-xl lg:text-2xl pb-4">EXCHANGE</div>
                        <div className="text-2xl lg:text-3xl text-[#FACC15] font-bold">
                          ${currentExchangeResult.toFixed(2)}
                        </div>
                        <div className="text-xl lg:text-xl">
                          {(
                            ((currentExchangeResult - investmentValue) /
                              investmentValue) *
                            100
                          ).toFixed(2)}
                          % ROI
                        </div>
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
