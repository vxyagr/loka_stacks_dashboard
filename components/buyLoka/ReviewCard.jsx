import React from "react";
import "tailwindcss/tailwind.css";

const ReviewCard = () => {
  const info_cards = [
    {
      title: "Predicted BTC yield",
      val: 0.15,
    },
    {
      title: "Energy price",
      val: "3 LET ($0.03)/KWh",
    },
    {
      title: "Total Energy Consumption",
      val: "78,840 LET ($788.4)",
    },

    {
      title: "Price per TH/s per day",
      val: "$8",
    },
    {
      title: "Hardware efficiency",
      val: "30 Joule/TH/s",
    },

    {
      title: "Energy cost per day",
      val: "216 LET ($6.48)",
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
      val: "$194.4",
    },
    {
      title: "Hashrate",
      info: "TH/s x 360 days",
      val: "$2880",
    },
  ];
  return (
    <div className="p-5 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Review
        </div>
        <div className="w-full flex flex-col h-full  bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px]  ">
          <div className="flex flex-col items-stretch w-full p-2 ">
            <div className="w-full p-2 flex justify-center items-center hero-lexend text-white text-2xl">
              $3000
            </div>
            <div className="w-full p-2 flex text-[#FACC15] justify-center items-center text-center hero-lexend text-xl">
              1 year contract
            </div>
          </div>
          <div className="grid flex-col  w-full p-5 m-0 min-h-[200px]  justify-center items-center text-center">
            {info_cards.map((card, index) => (
              <div
                key={index}
                className="w-full p-2 flex justify-center items-center lexend-light "
              >
                <div className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light">
                  <div className=" lg:min-w-[300px] min-w-[180px] flex rounded-xl px-2 py-2  justify-start items-start text-[#a7bfdd] text-left text-xs lg:text-sm">
                    {card.title}
                  </div>
                  <div className=" lg:min-w-[140px] min-w-[140px] lg:w-[140px] w-full flex rounded-xl px-2 py-2  lg:justify-end lg:items-end lg:text-right lg:pl-0 pl-10 text-center  text-white  lg:text-sm">
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
                  <div className=" lg:min-w-[140px] min-w-[140px] lg:w-[140px] w-full flex rounded-xl px-2 py-2  lg:justify-end lg:items-end lg:text-right lg:pl-0 pl-10 text-center  text-white  lg:text-sm">
                    {card.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:flex md:flex hidden py-10 px-10 justify-center items-center w-full text-center ">
            <button className="bg-[#79D5C6] w-[60%] rounded-xl text-white min-h-[50px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]">
              <span className="text-dashboard-blue text-2xl hero-lexend font-bold ">
                BUY
              </span>
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ReviewCard;
