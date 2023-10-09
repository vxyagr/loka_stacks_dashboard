import React from "react";
import "tailwindcss/tailwind.css";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  changeElectricityPerKwh,
  changeHashrateRentPerDay,
  changeInvestment,
  changeSelectedController,
  changeSelectedSites,
} from "../../redux/actions";
const MiningSiteCard = () => {
  const dispatch = useDispatch();
  const [investmentValue, setInvestmentValue] = useState(100);
  const miningSites = useSelector((state) => state.rootReducer.miningSites);
  const controllers = useSelector((state) => state.rootReducer.controllers);
  const handleMinusClick = () => {
    const newValue = Math.max(investmentValue - 100, 100); // Ensure the value is at least 100
    setInvestmentValue(newValue);
    //dispatch(changeInvestment(newValue));
  };

  const handleSelectMining = (event) => {
    dispatch(changeSelectedSites(miningSites[Number(event.target.value)]));
    dispatch(
      changeElectricityPerKwh(
        miningSites[Number(event.target.value)].electricityPerKwh
      )
    );
    dispatch(
      changeHashrateRentPerDay(
        miningSites[Number(event.target.value)].dollarPerHashrate
      )
    );
    dispatch(changeSelectedController(controllers[Number(event.target.value)]));
    //dispatch(changeInvestment(newValue));
    //setInvestmentValue(newValue);
  };

  useEffect(() => {
    //dispatch(changeInvestment(investmentValue));
    if (miningSites) {
      dispatch(changeElectricityPerKwh(miningSites[0].electricityPerKwh));
      dispatch(changeHashrateRentPerDay(miningSites[0].dollarPerHashrate));
      dispatch(changeSelectedSites(miningSites[0]));
      dispatch(changeSelectedController(controllers[0]));
    }
  }, [miningSites]);

  return (
    <div className="p-5 lg:pl-10 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0   ">
          Choose Mining Site
        </div>
        <div className="w-full flex flex-col  bg-dashboard-blue p-4 rounded-2xl border-[#245366] border-[1px] ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-2 flex justify-center items-center lexend-light ">
              <div className="w-full">
                <select
                  id="selectBox"
                  name="selectBox"
                  onChange={handleSelectMining}
                  className="block w-full p-2 border rounded-lg bg-white"
                >
                  {miningSites ? (
                    miningSites.map((site, index) => (
                      <option key={index} value={index}>
                        {site.name}
                        {" : $"}
                        {site.electricityPerKwh}
                        {" per Kwh, $"}
                        {site.dollarPerHashrate}
                        {" per TH/s per day"}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default MiningSiteCard;
