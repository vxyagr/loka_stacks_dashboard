import React from "react";
import "tailwindcss/tailwind.css";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeInvestment } from "../../redux/actions";
const ConnectWalletPrompt = () => {
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
    <div className="p-5 pb-0 w-full justify-center items-center text-center text-white rounded-lg  md:flex-row min-h-[200px] h-full flex flex-col text-whitepl-0 ">
      Connect Your Hiro Wallet
    </div>
  );
};

export default ConnectWalletPrompt;
