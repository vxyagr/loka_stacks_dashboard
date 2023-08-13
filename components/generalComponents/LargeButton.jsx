import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const BuyButton = ({ buttonText }) => {
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(100);

  return (
    <div className="p-5 w-full rounded-lg grid   min-h-[50px]  ">
      <button className="bg-[#79D5C6] w-full rounded-xl text-white min-h-[50px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]">
        <span className="text-dashboard-blue text-2xl hero-lexend font-bold ">
          {buttonText}
        </span>
      </button>
    </div>
  );
};

export default BuyButton;
