import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const BuyButton = ({ buttonText, loading }) => {
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(100);

  return (
    <div className="p-0 w-full rounded-lg inline-block  min-h-[30px]  ">
      {loading ? (
        <div className="flex items-center justify-center text-white">
          processing...
        </div>
      ) : (
        <button className="bg-[#79D5C6] w-full rounded-md text-white min-h-[30px] min-w-[60px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]">
          <span className="text-dashboard-blue font-bold text-sm hero-lexend ">
            {buttonText}
          </span>
        </button>
      )}
    </div>
  );
};

export default BuyButton;
