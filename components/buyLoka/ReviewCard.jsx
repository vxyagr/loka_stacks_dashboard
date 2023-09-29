import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ genesisNFT }) => {
  const hardwareEfficiency = useSelector(
    (state) => state.rootReducer.hardwareEfficiency
  );
  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );
  const currentDurationValue = useSelector(
    (state) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state) => state.rootReducer.durationTitle
  );
  const powerPerDay = useSelector(
    (state) => state.rootReducer.electricityPerDay
  );
  const electricityCostPerKwh = useSelector(
    (state) => state.rootReducer.electricityCostPerKwh
  );
  const currentICPAddress = useSelector(
    (state) => state.rootReducer.icpAddress
  );

  const loka = useSelector((state) => state.rootReducer.lokaCanister);

  const totalTHRented = useSelector((state) => state.rootReducer.totalTHRented);
  const currentDurationDiscount = useSelector(
    (state) => state.rootReducer.durationDiscount
  );

  //constants
  const currentSatsMined = useSelector((state) => state.rootReducer.satsMined);
  const currentBTCMined = (currentSatsMined * 0.00000001).toFixed(6);
  const [investmentValue, setInvestmentValue] = useState(0);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
  }, [currentInvestmentValue]);

  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [latestNFTid, setLatestNFTid] = useState(0);
  const [loading, setLoading] = useState(false);
  const THRentPrice =
    currentInvestmentValue / (totalTHRented * currentDurationValue * 28);
  const LETperDay =
    ((powerPerDay / 1000) * electricityCostPerKwh).toFixed(2) * 1000;
  const electricityCostPerDay = LETperDay / 1000;
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
  }, [currentDurationValue, currentDuration]);
  const info_cards = [
    {
      title: "Projected BTC yield",
      val:
        currentBTCMined.toLocaleString() +
        " BTC (" +
        currentSatsMined.toLocaleString() +
        " sats)",
    },
    {
      title: "Energy price",
      val: "3 LET ($0.03)/KWh",
    },
    {
      title: "Energy Consumption",
      val: powerPerDay.toLocaleString() + " W per day",
    },

    {
      title: "Price per TH/s per day",
      val: "$" + THRentPrice.toFixed(2),
    },
    {
      title: "Hardware efficiency",
      val: hardwareEfficiency + " Joule/TH",
    },

    {
      title: "Energy cost per day",
      val:
        LETperDay +
        " LET ($" +
        ((powerPerDay / 1000) * electricityCostPerKwh).toFixed(2) +
        ")",
    },
    {
      title: "Mining Location",
      val: "Gayo Lues",
    },
  ];

  const buyLoka = async () => {
    // overlay();
    //setShowOverlay(true);
    setLoading(true);
    setShowOverlay(true);
    //amount_: Nat, duration_: Nat, hashrate_ : Nat, elec_ : Nat, genesis_ : Nat, start_ : Nat, end_ : N
    console.log("minting " + parseInt(totalTHRented));
    const mint = await loka.mintContract(
      investmentValue,
      currentDurationValue * 28,
      currentDuration.toString(),
      parseInt(totalTHRented),
      parseInt(Math.ceil(LETperDay).toFixed(0)),
      0,
      1,
      1
    );

    setLatestNFTid(parseInt(mint));
    setLoading(false);
    console.log("NFT id " + mint + " " + latestNFTid);
  };

  const hideOverlay = () => {
    setShowOverlay(false);
  };

  const price_cards = [
    /*  {
      title: "Energy",
      info:
        LETperDay.toFixed(0) +
        " LET ($" +
        electricityCostPerDay +
        ") x 28 days",
      val: "$" + ((LETperDay * 28) / 1000).toFixed(2),
    },*/
    {
      title: "Hashrate",
      info: totalTHRented + "TH/s x " + currentDurationValue * 28 + " days",
      /*val:
        "$" +
        (
          (totalTHRented * 0.03 * currentDurationValue * 28) /
          (1 + currentDurationDiscount / 100)
        ).toFixed(2),*/
      val: "$" + investmentValue,
    },
  ];
  return (
    <div className="p-5 lg:pl-10 w-full rounded-lg  md:flex-row min-h-[100px]">
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-opacity-50 bg-gray-800">
          <div className="bg-white p-6 rounded-md shadow-lg">
            {" "}
            <div>
              <h3 className="text-xl font-semibold items-center justify-center text-center">
                {loading ? (
                  "Mining contract minting in progress..."
                ) : (
                  <p>
                    <div className="p-2">
                      Successfully minted Loka NFT ID#{latestNFTid}
                    </div>
                    <div className="p-2">
                      Contract amount{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(investmentValue)}{" "}
                      for {currentDuration}
                    </div>
                    <div className="p-2">
                      hashrate of{" "}
                      {new Intl.NumberFormat("en-US", {}).format(totalTHRented)}{" "}
                      TH
                    </div>
                    <button
                      onClick={() => setShowOverlay(false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
                    >
                      Close
                    </button>
                  </p>
                )}
              </h3>
            </div>
          </div>
        </div>
      )}{" "}
      <div>
        <div className="w-full flex flex-col text-white  p-4 pl-0  ">
          Review
        </div>
        <div className="w-full flex flex-col h-full  bg-dashboard-blue p-0 rounded-lg border-[#245366] border-[1px]  ">
          <div className="flex flex-col items-stretch w-full p-2 pl-10 ">
            <div className="w-full p-2 flex justify-start items-start hero-lexend text-white text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(investmentValue)}
            </div>
            <div className="w-full p-2 flex text-[#09a668] justify-start items-start text-left hero-lexend text-xl">
              {totalTHRented} TH/s
            </div>
            <div className="w-full p-2 flex text-[#FACC15] justify-start items-start text-left hero-lexend text-xl">
              {duration} contract
            </div>
          </div>
          <div className="px-10 py-4">
            <div className="border-t-[1px]"></div>
          </div>
          <div className="grid flex-col  w-full pl-10 m-0 min-h-[200px]  justify-start items-start text-left">
            {info_cards.map((card, index) => (
              <div
                key={index}
                className="w-full p-1 flex justify-center items-center lexend-light "
              >
                <div className="w-full  p-0 flex  flex-wrap justify-start items-start text-left lexend-light">
                  <div className=" lg:min-w-[200px] min-w-[180px] flex rounded-xl px-2 py-1  justify-start items-start text-[#a7bfdd] text-left text-xs lg:text-sm">
                    {card.title}
                  </div>
                  <div className=" lg:min-w-[140px] min-w-[140px] w-full flex rounded-xl px-2 py-1   pl-10 text-center  text-white text-sm  lg:text-lg">
                    {card.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-10 py-4">
            <div className="border-t-[1px]"></div>
          </div>
          <div className="px-5 w-full text-center text-[#FACC15] ">
            Investment Allocation
          </div>

          <div className="grid flex-col  w-full p-5 m-0 min-h-[100px]  justify-center items-center text-center">
            {price_cards.map((card, index) => (
              <div
                key={index}
                className="w-full p-2 flex justify-center items-center lexend-light "
              >
                <div className="w-full  p-0 flex pl-5 flex-wrap justify-start items-start text-left lexend-light">
                  <div className="grid lg:min-w-[300px] min-w-[180px] rounded-xl px-2 py-2  justify-start items-start text-[#a7bfdd] text-left text-xs lg:text-sm">
                    <span className="text-sm font-bold lg:text-base text-[#09a668]">
                      {card.title}
                    </span>
                    <br />
                    {card.info}
                  </div>
                  <div className=" lg:min-w-[140px] min-w-[140px] lg:w-[140px] w-full flex rounded-xl px-2 py-2  lg:justify-end lg:items-end lg:text-right lg:pl-0 pl-10 text-left  text-white  lg:text-lg">
                    {card.val}
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex flex-col text-[#09a668] font-bold  p-4 pl-0 lg:text-xl ">
              Total{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(investmentValue)}
            </div>
            <div className="lg:flex md:flex hidden py-5 pl-7 px-2  justify-center items-center w-full text-center ">
              {genesisNFT ? (
                <button
                  onClick={buyLoka}
                  className="bg-[#79D5C6] w-full rounded-xl text-white min-h-[50px]   leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base transition duration-300 ease-in-out hover:bg-[#cff0ea]"
                >
                  <span className="text-dashboard-blue text-2xl hero-lexend font-bold ">
                    BUY
                  </span>
                </button>
              ) : (
                ":"
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ReviewCard;
