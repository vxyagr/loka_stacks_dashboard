import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDuration,
  changeDurationTitle,
  changeDurationDiscount,
} from "../../redux/actions";

import { useState, useEffect } from "react";
const DurationCard = () => {
  const dispatch = useDispatch();
  const [durationValue, setDurationValue] = useState(12);
  const [durationTitle, setDurationTitle] = useState("1 year");
  const [durationDiscount, setDurationDiscount] = useState(10);

  const handleClick = (newValue, newValue2, discount_value) => {
    //dispatch(changeDuration(newValue));
    //dispatch(changeDurationTitle(newValue2));
    setDurationValue(newValue);
    setDurationTitle(newValue2);
    setDurationDiscount(discount_value);
  };

  useEffect(() => {
    dispatch(changeDuration(durationValue));
    dispatch(changeDurationTitle(durationTitle));
    dispatch(changeDurationDiscount(durationDiscount));
    //console.log("discount " + durationDiscount);
  }, [durationValue]);

  const cards = [
    {
      title: "1 month",
      discount: "",
      discount_value: 0,
      val: 1,
    },
    {
      title: "6 months",
      discount: "5% discount",
      discount_value: 5,
      val: 6,
    },

    {
      title: "1 year",
      discount: "10% discount",
      discount_value: 10,
      val: 12,
    },
    {
      title: "2 years",
      discount: "20% discount",
      discount_value: 20,
      val: 24,
    },
  ];
  return (
    <div className="p-5 pb-0 w-full rounded-lg  md:flex-row min-h-[100px]">
      {" "}
      <div>
        <div className="w-full flex flex-col text-white  p-2 pl-0    ">
          Choose mining duration
        </div>
        <div className="w-full flex flex-col p-0 rounded-lg ">
          <div className="flex flex-col items-stretch w-full p-0 ">
            <div className="w-full p-0 flex flex-col justify-center items-center lexend-light">
              <div className="w-full p-0 flex flex-wrap justify-center items-center text-center lexend-light">
                {cards.map((card, index) => (
                  <button
                    onClick={() =>
                      handleClick(card.val, card.title, card.discount_value)
                    }
                    key={index}
                    className={`grid lg:min-w-[120px] min-w-[80px]  rounded-xl px-2 py-2 m-2 justify-center items-center text-white text-center text-xs lg:text-base cursor-pointer transition duration-300 ease-in-out
                    ${
                      durationValue == card.val
                        ? "bg-dashboard-gold  text-dashboard-blue font-bold"
                        : "text-white bg-dashboard-blue  hover:bg-dashboard-gold hover:shadow-blue-400/20 border-[#245366] border-[1px]"
                    }`}
                  >
                    <div
                      className={`${
                        durationValue == card.val
                          ? "  text-dashboard-blue font-bold"
                          : "text-white  "
                      }`}
                    >
                      {card.title}
                    </div>
                    <div
                      className={`text-xs ${
                        durationValue == card.val
                          ? "  text-dashboard-blue font-bold"
                          : "text-yellow-400  "
                      }`}
                    >
                      {card.discount}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default DurationCard;
