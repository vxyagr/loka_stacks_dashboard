import React from "react";
import "tailwindcss/tailwind.css";

const ReviewCard = () => {
  const info_cards = [
    {
      title: "Predicted BTC yield",
      val: 0.15,
    },
    {
      title: "Total Energy Consumption",
      val: 6,
    },

    {
      title: "Price per TH",
      val: 12,
    },
    {
      title: "Hardware efficiency",
      val: 24,
    },
    {
      title: "Energy price",
      val: 0.03,
    },
    {
      title: "Mining Location",
      val: "Gayo Lues",
    },
  ];

  const price_cards = [
    {
      title: "Energy",
      val: 0.15,
    },
    {
      title: "Hashrate and Hosting",
      val: 6,
    },
  ];
  return (
    <div className="p-5 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Review
        </div>
        <div className="w-full flex flex-col h-full  bg-dashboard-blue p-0 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-2 ">
            <div className="w-full p-2 flex justify-center items-center hero-lexend text-white text-2xl">
              INVESTMENT : $3000
            </div>
            <div className="w-full p-2 flex text-[#FACC15] justify-center items-center text-center hero-lexend text-xl">
              1 year contract
            </div>
          </div>
          <div className="flex flex-col  w-full p-0 m-0 bg-dashboard-gray min-h-[200px] rounded-b-lg ">
            {info_cards.map((card, index) => (
              <div
                key={index}
                className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light"
              >
                <div className=" lg:min-w-[300px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-white text-left text-xs lg:text-base">
                  {card.title}
                </div>
                <div className=" lg:min-w-[120px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-left text-white text-xs lg:text-base">
                  {card.val}
                </div>
              </div>
            ))}

            <div>Investment Allocation</div>

            <div className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light">
              <div className=" lg:min-w-[300px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-white text-left text-xs lg:text-base">
                10 days LET energy token
              </div>
              <div className=" lg:min-w-[120px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-left text-white text-xs lg:text-base">
                $25
              </div>
            </div>
            <div className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light">
              <div className=" lg:min-w-[300px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-white text-left text-xs lg:text-base">
                Hashrate and Hosting Fee
              </div>
              <div className=" lg:min-w-[120px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-start items-start text-left text-white text-xs lg:text-base">
                $2825
              </div>
            </div>
            <div className="py-2 px-10">
              <button className="bg-[#79D5C6] w-full rounded-xl text-white min-h-[80px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]">
                <span className="text-dashboard-blue text-3xl hero-lexend font-bold ">
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
