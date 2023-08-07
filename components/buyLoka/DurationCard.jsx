import React from "react";
import "tailwindcss/tailwind.css";

const DurationCard = () => {
  const cards = [
    {
      title: "1 month",
    },
    {
      title: "6 months",
    },

    {
      title: "1 year",
    },
    {
      title: "2 years",
    },
  ];
  return (
    <div className="p-2 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  px-4   ">
          Choose mining duration
        </div>
        <div className="w-full flex flex-col p-0 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-0 flex flex-col justify-center items-center lexend-light">
              <div className="w-full p-0 flex flex-wrap justify-center items-center text-center lexend-light">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className=" bg-dashboard-blue lg:min-w-[120px] min-w-[80px] flex rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base"
                  >
                    {card.title}
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
