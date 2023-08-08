import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AmountCard = () => {
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(100);

  const updateInvestmentValue = async () => {
    dispatch({
      type: "SET_INVESTMENT",
      //payload: investmentValue,
      payload: investmentValue,
    });
  };

  const [value, setValue] = useState(100); // Initial value set to 100

  const handleMinusClick = () => {
    const newValue = Math.max(investmentValue - 100, 100); // Ensure the value is at least 100
    setInvestmentValue(newValue);
    updateInvestmentValue;
  };

  const handlePlusClick = () => {
    setInvestmentValue(investmentValue + 100);
    updateInvestmentValue;
  };

  const handleInputChange = (event) => {
    const newValue = Math.max(Number(event.target.value), 100); // Ensure the value is at least 100
    setInvestmentValue(newValue);
  };

  return (
    <div className="p-5 pb-0 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4   ">
          Enter your investment amount
        </div>
        <div className="w-full flex flex-col  bg-dashboard-blue p-4 rounded-2xl border-[#245366] border-[1px] ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-2 flex justify-center items-center lexend-light ">
              <button
                onClick={handleMinusClick}
                className=" rounded-md px-2 py-0 m-4 text-yellow-400 text-base hover:text-[#cff0ea]"
              >
                <FontAwesomeIcon icon={faMinusCircle} size="2xl" />
              </button>
              <div className="lg:text-3xl text-2xl  text-white lg:min-w-[200px] min-w-[120px] text-center hero-lexend">
                <input
                  className="lg:w-[200px] w-[120px] number-input-container bg-transparent lg:text-3xl text-2xl  text-white text-center  "
                  type="number"
                  value={investmentValue}
                  onChange={handleInputChange}
                  min={100}
                  step={100}
                />
              </div>
              <button
                onClick={handlePlusClick}
                className=" rounded-md px-2 py-0 m-4 text-yellow-400 text-base hover:text-[#cff0ea]"
              >
                <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AmountCard;
