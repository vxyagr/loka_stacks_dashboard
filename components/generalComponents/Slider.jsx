import React, { useState } from "react";
//import "./Slider.css"; // Import your CSS file for styling

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeBTCSimulated } from "../../redux/actions";

const Slider = () => {
  // Initial value set to 50
  const dispatch = useDispatch();
  const btcPriceToday = useSelector((state) => state.rootReducer.btcPriceToday);
  const [value, setValue] = useState(btcPriceToday);
  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    dispatch(changeBTCSimulated(value));
  }, [value]);

  return (
    <div className="slider-container">
      <p className="text-white lg:text-md">USD {value}</p>
      <input
        type="range"
        min="25000"
        max="60000"
        value={value}
        onChange={handleSliderChange}
        className="slider rounded-lg"
      />
      <p className="text-[#93a5bf] text-xs lg:text-sm p-2 ">
        Slide left or right to simulate bitcoin price in the future
      </p>
    </div>
  );
};

export default Slider;
