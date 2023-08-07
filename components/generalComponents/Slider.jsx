import React, { useState } from "react";
//import "./Slider.css"; // Import your CSS file for styling

const Slider = () => {
  const [value, setValue] = useState(50); // Initial value set to 50

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

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
      <p className="text-white text-xs lg:text-sm p-2 ">
        Slide left or right to simulate bitcoin price in the future
      </p>
    </div>
  );
};

export default Slider;
