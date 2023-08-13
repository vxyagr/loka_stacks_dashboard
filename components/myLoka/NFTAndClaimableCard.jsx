import SmallButton from "../../components/generalComponents/SmallButton";

const NFTAndClaimableCard = ({ image }) => {
  return (
    <div className="flex flex-col items-stretch w-full p-0 ">
      <div className="w-full p-0  text-white font-medium rounded-xl">
        <img
          className="rounded-tl-lg rounded-tr-lg lg:rounded-tr-none "
          src={"./" + image}
          style={{ width: "500px", height: "180px" }}
        ></img>
      </div>
      <div className="w-full p-2 grid ">
        <div className="text-xl p-2 pb-0   text-white w-full lg:text-left">
          Rewards
        </div>

        <div className=" flex rounded-md  p-2 text-sm text-left justify-left items-left">
          <div className="grid w-2/5">
            <div className="flex-row">
              <div className="inline-block rounded-md pr-2  py-2 text-base text-left text-white">
                0.022
              </div>
              <div className="text-dashboard-blue flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-yellow-400 ">
                sBTC
              </div>
            </div>
            <div className=" flex-row  rounded-md  py-0 text-sm text-left">
              <SmallButton buttonText={"CLAIM"} />
            </div>
          </div>
          <div className="grid w-1/5"></div>
          <div className="grid w-2/5">
            <div className="flex-row">
              <div className="inline-block rounded-md pr-2  py-2 text-base text-left text-white">
                0.022
              </div>
              <div className="text-white flex-wrap inline-block text-xs text-center min-w-[50px] px-2  rounded-full bg-custom-green border-[#4c7766] border-[1px] ">
                LOM
              </div>
            </div>
            <div className=" flex-row  rounded-md  py-0 text-sm text-left">
              <SmallButton buttonText={"CLAIM"} />
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
