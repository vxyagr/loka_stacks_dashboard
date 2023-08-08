import React from "react";
import "tailwindcss/tailwind.css";

const DurationCard = () => {
  const cards = [
    {
      title: "1 month",
      discount: "",
      val: 1,
    },
    {
      title: "6 months",
      discount: "5% discount",
      val: 6,
    },

    {
      title: "1 year",
      discount: "10% discount",
      val: 12,
    },
    {
      title: "2 years",
      discount: "20% discount",
      val: 24,
    },
  ];
  return (
    <div className="p-5 pb-0 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-2    ">
          Choose mining duration
        </div>
        <div className="w-full flex flex-col p-0 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-0 flex flex-col justify-center items-center lexend-light">
              <div className="w-full p-0 flex flex-wrap justify-center items-center text-center lexend-light">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className=" bg-dashboard-blue grid lg:min-w-[120px] min-w-[80px]  rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base"
                  >
                    <div>{card.title}</div>
                    <div className="text-xs text-yellow-400">
                      {card.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default DurationCard;
