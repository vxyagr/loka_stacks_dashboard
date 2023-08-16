import React from "react";
import "tailwindcss/tailwind.css";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeInvestment } from "../../redux/actions";
import SmallButton from "./SmallButton";
const InputGenesisNFTPrompt = () => {
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(100);

  const handleMinusClick = () => {
    const newValue = Math.max(investmentValue - 100, 100); // Ensure the value is at least 100
    setInvestmentValue(newValue);
    //dispatch(changeInvestment(newValue));
  };

  const handlePlusClick = () => {
    var newValue = investmentValue + 100;

    //dispatch(changeInvestment(newValue));
    setInvestmentValue(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = Math.max(Number(event.target.value), 100); // Ensure the value is at least 100
    //dispatch(changeInvestment(newValue));
    setInvestmentValue(newValue);
  };

  useEffect(() => {
    dispatch(changeInvestment(investmentValue));
  }, [investmentValue]);

  return (
    <div className="p-5 pb-0 w-full flex justify-center items-center text-center text-white rounded-lg   min-h-[200px] h-full flex-col text-white pl-0">
      Input Loka Genesis NFT ID
      <div className="p-10 lg:text-3xl text-2xl w-full text-white lg:min-w-[300px] min-w-[200px] text-center hero-lexend">
        <input
          className="lg:w-[200px] w-[100px] number-input-container  lg:text-2xl text-xl rounded-xl  text-black text-center  "
          type=""
        />
      </div>
      <div className="flex w-full justify-center items-center text-center">
        <div className="w-[100px] justify-center items-center text-center">
          <SmallButton buttonText={"Check"} className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default InputGenesisNFTPrompt;
