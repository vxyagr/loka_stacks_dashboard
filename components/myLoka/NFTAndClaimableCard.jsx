import SmallButton from "../../components/generalComponents/SmallButton";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const NFTAndClaimableCard = ({ image, nft, update }) => {
  const [claimBTCLoading, setClaimBTCLoading] = useState(false);
  const [claimLOMLoading, setClaimLOMLoading] = useState(false);
  const currentICPAddress = useSelector(
    (state) => state.rootReducer.icpAddress
  );

  const loka = useSelector((state) => state.rootReducer.lokaCanister);

  const claimBTC = async () => {
    if (parseInt(nft.claimableBTC) <= 0) return;
    setClaimBTCLoading(true);
    console.log("claiming BTC..");
    if (!loka || !currentICPAddress || parseInt(nft.claimableBTC) <= 0) return;
    var options = {};
    //options["identity"] = identity;
    var claimResult = await loka.claimBTC(parseInt(nft.id));

    console.log(claimResult);
    update();
    console.log("done..");
    setClaimBTCLoading(false);
  };

  const claimLOM = async () => {
    if (parseInt(nft.claimableLOM) <= 0) return;
    setClaimLOMLoading(true);
    console.log("claiming LOM..");
    if (!loka || !currentICPAddress || parseInt(nft.claimableLOM) <= 0) return;
    var options = {};
    //options["identity"] = identity;
    var claimResult = await loka.claimLOM(parseInt(nft.id));

    console.log(claimResult);
    update();
    console.log("done..");
    setClaimLOMLoading(false);
  };
  return (
    <div className="flex flex-col items-stretch w-full p-0 ">
      <div className="w-full p-0  text-white font-medium rounded-xl relative">
        <img
          className="rounded-tl-lg rounded-tr-lg lg:rounded-tr-none "
          src={"./" + image}
          style={{ width: "500px", height: "180px" }}
        ></img>
        <div className="absolute inset-0 bg-black bg-opacity-80 w-full h-[100%]] align-middle justify-center items-center text-center">
          Loka NFT #{nft.id.toString()}
        </div>
      </div>
      <div className="w-full p-2 grid ">
        <div className="text-xl p-2 pb-0   text-white w-full lg:text-left">
          Loka #{nft.id.toString()} Rewards
        </div>

        <div className=" flex rounded-md  p-2 text-sm text-left justify-left items-left">
          <div className="grid w-2/5">
            <div className="flex-row">
              <div className="inline-block rounded-md pr-2  py-2 text-base text-left text-white">
                {nft.claimableBTC.toString()}
              </div>
              <div className="text-dashboard-blue flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-yellow-400 ">
                ckBTC
              </div>
            </div>
            <div
              onClick={claimBTC}
              className=" flex-row  rounded-md  py-0 text-sm text-left"
            >
              <SmallButton buttonText={"CLAIM BTC"} loading={claimBTCLoading} />
            </div>
          </div>
          <div className="grid w-1/5"></div>
          <div className="grid w-2/5">
            <div className="flex-row">
              <div className="inline-block rounded-md pr-2  py-2 text-base text-left text-white">
                {nft.claimableLOM.toString()}
              </div>
              <div className="text-white flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px] ">
                LOM
              </div>
            </div>
            <div
              onClick={claimLOM}
              className=" flex-row  rounded-md  py-0 text-sm text-left"
            >
              <SmallButton buttonText={"CLAIM LOM"} loading={claimLOMLoading} />
            </div>
          </div>
        </div>
        {/*<div className=" flex-row  rounded-md  py-0 text-sm text-left">
          <SmallButton buttonText={"CLAIM"} />
        </div> */}
      </div>
    </div>
  );
};

export default NFTAndClaimableCard;
