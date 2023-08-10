import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const ReviewCard = () => {
  const hardwareEfficiency = useSelector(
    (state) => state.rootReducer.hardwareEfficiency
  );
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const currentDurationValue = useSelector(
    (state) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state) => state.rootReducer.durationTitle
  );

  const [investmentValue, setInvestmentValue] = useState(0);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
  }, [currentInvestmentValue]);

  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
  }, [currentDurationValue, currentDuration]);
  const info_cards = [
    {
      title: "Predicted BTC yield",
      val: "TBA",
    },
    {
      title: "Energy price",
      val: "3 LET ($0.03)/KWh",
    },
    {
      title: "Total Energy Consumption",
      val: "TBA",
    },

    {
      title: "Price per TH/s per day",
      val: "$8",
    },
    {
      title: "Hardware efficiency",
      val: hardwareEfficiency + " Joule/TH/s",
    },

    {
      title: "Energy cost per day",
      val: "TBA",
    },
    {
      title: "Mining Location",
      val: "Gayo Lues",
    },
  ];

  const price_cards = [
    {
      title: "Energy",
      info: "216 LET ($6.48) x 30 days",
      val: "TBA",
    },
    {
      title: "Hashrate",
      info: "TH/s x 360 days",
      val: "TBA",
    },
  ];
  return (
    <div className="p-5 lg:pl-10 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Review
        </div>
        <div className="w-full flex flex-col h-full  bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px]  ">
          <div className="flex flex-col items-stretch w-full p-2 pl-10 ">
            <div className="w-full p-2 flex justify-start items-start hero-lexend text-white text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(investmentValue)}
            </div>
            <div className="w-full p-2 flex text-[#FACC15] justify-start items-start text-left hero-lexend text-xl">
              {duration} contract
            </div>
          </div>
          <div className="px-10 py-4">
            <div className="border-t-[1px]"></div>
          </div>
          <div className="grid flex-col  w-full pl-10 m-0 min-h-[200px]  justify-start items-start text-left">
            {info_cards.map((card, index) => (
              <div
                key={index}
                className="w-full p-1 flex justify-center items-center lexend-light "
              >
                <div className="w-full  p-0 flex  flex-wrap justify-start items-start text-left lexend-light">
                  <div className=" lg:min-w-[200px] min-w-[180px] flex rounded-xl px-2 py-1  justify-start items-start text-[#a7bfdd] text-left text-xs lg:text-sm">
                    {card.title}
                  </div>
                  <div className=" lg:min-w-[140px] min-w-[140px] w-full flex rounded-xl px-2 py-1   pl-10 text-center  text-white text-sm  lg:text-lg">
                    {card.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-10 py-4">
            <div className="border-t-[1px]"></div>
          </div>
          <div className="px-5 w-full text-center text-[#FACC15] ">
            Investment Allocation
          </div>

          <div className="grid flex-col  w-full p-5 m-0 min-h-[100px]  justify-center items-center text-center">
            {price_cards.map((card, index) => (
              <div
                key={index}
                className="w-full p-2 flex justify-center items-center lexend-light "
              >
                <div className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light">
                  <div className=" lg:min-w-[300px] min-w-[180px] flex rounded-xl px-2 py-2  justify-start items-start text-[#a7bfdd] text-left text-xs lg:text-sm">
                    {card.title}
                  </div>
                  <div className=" lg:min-w-[140px] min-w-[140px] lg:w-[140px] w-full flex rounded-xl px-2 py-2  lg:justify-end lg:items-end lg:text-right lg:pl-0 pl-10 text-center  text-white  lg:text-lg">
                    {card.val}
                  </div>
                </div>
              </div>
            ))}
            <div className="lg:flex md:flex hidden py-5 pl-7 px-2  justify-center items-center w-full text-center ">
              <button className="bg-[#79D5C6] w-full rounded-xl text-white min-h-[50px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]">
                <span className="text-dashboard-blue text-2xl hero-lexend font-bold ">
                  BUY
                </span>
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ReviewCard;
