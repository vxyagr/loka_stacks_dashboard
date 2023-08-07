import React from "react";
import "tailwindcss/tailwind.css";

const ReviewCard = () => {
  return (
    <div className="p-5 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Review
        </div>
        <div className="w-full flex flex-col min-h-[500px]  bg-dashboard-blue p-2 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-2 ">
            <div className="w-full p-2 flex justify-center items-center lexend-light"></div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ReviewCard;
