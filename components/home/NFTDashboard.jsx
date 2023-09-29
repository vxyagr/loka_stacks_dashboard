import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const NFTDashboard = () => {
  const [nftList, setNFTList] = useState([]);
  const [totalBTCClaimed, setTotalBTCClaimed] = useState(0);
  const [totalBTCClaimable, setTotalBTCClaimable] = useState(0);
  const [totalContractAmount, setTotalContractAmount] = useState(0);
  const [contractQuantity, setContractQuantity] = useState(0);
  const [expired, setExpired] = useState(0);
  const [active, setActive] = useState(0);
  const [staked, setStaked] = useState(0);

  const currentInvestmentValue = useSelector(
    (state) => state.rootReducer.investment
  );

  const currentICPAddress = useSelector(
    (state) => state.rootReducer.icpAddress
  );

  const loka = useSelector((state) => state.rootReducer.lokaCanister);
  /*const stacksAddress = useSelector(
    (state: any) => state.rootReducer.stacksAddress

  ); */

  const getNFTList = async () => {
    if (loka && currentICPAddress) {
      const nftList_ = await loka.getOwnedContracts();
      setNFTList(nftList_);
      console.log(nftList);
    }
  };

  const calculateBTCStats = () => {
    var totalBTCClaimed_ = 0;
    var totalBTCClaimable_ = 0;
    var totalContracts_ = nftList.length;
    var totalAmount_ = 0;
    var expired_ = 0;
    var active_ = 0;
    var staked_ = 0;
    console.log("calculating " + nftList.length);
    nftList.forEach((item, index) => {
      totalBTCClaimed_ += parseInt(item.claimedBTC);
      totalBTCClaimable_ += parseInt(item.claimableBTC);
      totalAmount_ += parseInt(item.amount);
      if (parseInt(item.daysLeft) == 0) {
        expired_ += 1;
      } else active_ += 1;
      //console.log(item);
    });
    setTotalBTCClaimable(totalBTCClaimable_);
    setTotalBTCClaimed(totalBTCClaimed_);
    setTotalContractAmount(totalAmount_);
    setContractQuantity(totalContracts_);
    setExpired(expired_);
    setActive(active_);
    setStaked(staked_);
  };

  useEffect(() => {
    getNFTList();
  }, [loka]);

  useEffect(() => {
    calculateBTCStats();
  }, [nftList]);
  return (
    <div className="p-0 w-full rounded-lg flex flex-col md:flex-row bg-dashboard-gray min-h-[200px] ">
      <div className="w-full flex flex-col lg:w-1/4 bg-dashboard-blue p-4 rounded-lg border-[#245366] border-[1px] ">
        <div className="flex flex-col items-stretch w-full p-5 ">
          <div className="w-full p-2  text-white font-medium">
            Claimable Bitcoin
          </div>
          <div className="w-full p-2 flex justify-between items-center">
            <div className="text-5xl font-bold text-white w-full lg:text-right">
              {totalBTCClaimable.toString()}
            </div>
            <div className="bg-yellow-400 rounded-md px-2 py-0 m-4 text-gray-800 text-sm">
              ckBTC
            </div>
          </div>
          <button className="w-full p-2 text-yellow-400  rounded-md transition duration-300 ease-in-out hover:shadow-lg">
            $TBA
          </button>
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-[#09A668] font-lg">
          Loka Contracts
        </div>
        <div className="text-white text-center text-3xl">
          {contractQuantity.toString()}
        </div>
        <div className="text-white w-full text-center justify-start items-center">
          <div className="text-white flex-wrap inline-block text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px]">
            ${totalContractAmount.toString()} invested
          </div>
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Status
        </div>
        <div className="text-[#09A668] text-center text-xl">
          {active.toString()} active
        </div>
        <div className="text-[#f5a405] text-center">
          {staked.toString()} staked
        </div>
        <div className="text-white text-center">
          {expired.toString()} expired
        </div>
      </div>
      <div className="w-full grid lg:w-1/4 p-4">
        <div className="w-full p-2 text-center  text-yellow-400 font-lg">
          Total BTC Claimed
        </div>
        <div className="text-white text-center text-2xl">
          {totalBTCClaimed.toString()}
        </div>
        <div className="text-white text-center">
          <div className="text-white flex-wrap inline-block text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px]">
            $TBA
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDashboard;
