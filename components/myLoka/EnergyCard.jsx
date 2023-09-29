import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RechargeButton from "./RechargeButton";

import { faBolt } from "@fortawesome/free-solid-svg-icons";
const EnergyCard = ({ nft }) => {
  const condition =
    nft.daysLeft * nft.electricityPerDay > nft.LETBalance ? false : true;
  const remaining =
    nft.daysLeft * nft.electricityPerDay > nft.LETBalance
      ? "LET depleted"
      : nft.LETBalance / nft.electricityPerDay + " days remaining";
  return (
    <div className="flex-col w-full p-0 justify-center items-center text-center   ">
      <div className="w-full p-2  text-yellow-400 font-medium h-2/6">
        Energy Status
      </div>
      <div
        className={`inline-block  px-2  text-white font-medium h-2/6  rounded-sm ${
          condition ? "bg-custom-green" : "bg-red-500"
        }`}
      >
        {remaining} <FontAwesomeIcon icon={faBolt} />
      </div>
      <div className="inline-block px-2 pt-2 w-full  text-white text-xs h-2/6 ">
        <span className="text-yellow-400">
          {nft.electricityPerDay.toString()}
        </span>{" "}
        LET / day
      </div>
      <div className="inline-block px-2 w-full  text-white text-xs h-2/6 ">
        <span className="text-[#e68e46]">{nft.LETBalance.toString()}</span> LET
        remaining
      </div>
      <div className="w-full p-0 pt-4 grid h-3/6 ">
        <RechargeButton buttonText={"RECHARGE"} />
      </div>
      <div className="w-full p-0 pb-2 grid pt-4    h-1/6">$TBA spent</div>
    </div>
  );
};

export default EnergyCard;
