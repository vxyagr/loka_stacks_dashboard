import EnergyCard from "./EnergyCard";
const StatsCard = ({ nft }) => {
  return (
    <div className=" flex rounded-md  p-0 py-4 text-sm text-left justify-center items-center">
      <div className="grid w-2/5 justify-center items-start">
        <div className="inline-block rounded-md pr-2  py-2 text-base text-left text-white">
          Total Claimed
        </div>
        <div className="flex-row py-4">
          <div className="inline-block rounded-md pr-2  py-2 text-lg text-left text-white">
            {nft.claimedBTC.toString()}
          </div>
          <div className="text-dashboard-blue flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-yellow-400 ">
            ckBTC
          </div>
        </div>
        <div className="flex-row">
          <div className="inline-block rounded-md pr-2  py-2 text-lg text-left text-white">
            {nft.claimedLOM.toString()}
          </div>
          <div className="text-white flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px] ">
            LOM
          </div>
        </div>
      </div>
      <div className="flex-col w-2/5 justify-center items-start h-full border-[1px] border-gray-500 rounded-xl p-1 ">
        <EnergyCard nft={nft} />
      </div>
    </div>
  );
};

export default StatsCard;
