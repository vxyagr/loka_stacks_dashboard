import React, { useState } from "react";
//import "./Slider.css"; // Import your CSS file for styling

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeBTCSimulated } from "../../redux/actions";
import { changeBTCPriceToday } from "../../redux/actions";
import axios from "axios";
const Slider = () => {
  // Initial value set to 50
  const dispatch = useDispatch();
  const btcPriceToday = useSelector((state) => state.rootReducer.btcPriceToday);
  const [value, setValue] = useState(btcPriceToday);
  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Fetch Bitcoin price from CoinGecko API
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => {
        var btc = response.data.bitcoin.usd;
        setValue(btc);

        console.log("btc price today " + btc);
      })
      .catch((error) => {
        console.error("Error fetching Bitcoin price:", error);
      });
  }, []);

  useEffect(() => {
    dispatch(changeBTCSimulated(value));
  }, [value]);

  return (
    <div className="slider-container">
      {/*<p className="text-[#93a5bf] text-xs lg:text-sm p-2 "> */}
      <p className="text-yellow-400 text-xs lg:text-sm p-2 ">
        Slide left or right to simulate bitcoin price in the future
      </p>
      <p className="text-white lg:text-base">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)}
      </p>
      <input
        type="range"
        min="25000"
        max="60000"
        value={value}
        onChange={handleSliderChange}
        className="slider rounded-lg"
      />
    </div>
  );
};

export default Slider;
