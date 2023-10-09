const ROICard = ({ nft, update }) => {
  function formatFloat(number) {
    var numb_ = parseFloat(number).toFixed(2);
    return numb_;
  }
  return (
    <div className="flex-col w-full py-4   ">
      <div className="w-full p-0  text-white font-medium ">
        <div className="grid w-full justify-center items-center  ">
          <div className="w-full justify-start text-lg text-yellow-400 text-left p-2 ">
            ${nft.amount.toString()}
          </div>
          <div className="w-full justify-start text-center text-sm text-[#e68e46] p-0 ">
            {formatFloat(nft.hashrate).toString()} TH/s
          </div>
          <div className="w-full justify-start text-right pb-2  ">
            <div className="bg-custom-green rounded-xl  px-2 text-sm  text-white text-right">
              {nft.durationText.toString()}
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="w-full p-4 grid border-t-[1px] border-gray-500 h-3/6 ">
        <div className="grid w-full justify-center items-center h-full  ">
          <div className="w-full justify-start text-sm text-white text-center p-0">
            BTC Mined
          </div>
          <div className="flex-col w-full justify-start text-3xl text-yellow-400 text-center p-2 ">
            <div>
              {(
                parseInt(nft.claimedBTC) + parseInt(nft.claimableBTC)
              ).toString()}
            </div>
            <div className="w-full justify-start h-full text-right  ">
              <div className="bg-custom-green w-full rounded-xl inline-block px-2 text-sm   text-white text-center">
                $
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-0 grid pt-4   border-t-[1px] border-gray-500 h-1/6">
        <div className="grid w-full justify-center items-center ">
          <div className="w-full justify-start text-sm text-white text-center p-2">
            {(nft.daysLeft * 28).toString()} days left
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICard;
