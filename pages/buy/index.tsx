import type { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/generalComponents/Navigation";
import AmountCard from "../../components/buyLoka/AmountCard";
import MiningSiteCard from "../../components/buyLoka/MiningSiteCard";
import DurationCard from "../../components/buyLoka/DurationCard";
import ReviewCard from "../../components/buyLoka/ReviewCard";
import SimulationCard from "../../components/buyLoka/SimulationCard";
import DashboardMenu from "../../components/generalComponents/DashboardMenu";
import BuyButton from "../../components/buyLoka/BuyButton";
import ConnectWalletPrompt from "../../components/generalComponents/ConnectWalletPrompt";
import InputGenesisNFTPrompt from "../../components/generalComponents/InputGenesisNFTPrompt";
import { changeBTCPriceToday } from "../../redux/actions";
import axios from "axios";
import { useConnect } from "@stacks/connect-react";
import { cvToString } from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network";
import {
  AnchorMode,
  standardPrincipalCV,
  callReadOnlyFunction,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
} from "@stacks/transactions";

import Head from "next/head";

const BuyLoka: NextPage = () => {
  const currentICPAddress = useSelector(
    (state: any) => state.rootReducer.icpAddress
  );

  const loka = useSelector((state: any) => state.rootReducer.lokaCanister);
  const stacksAddress = 1;
  const genesisNFT = true;
  const dispatch = useDispatch();
  const [nftList, setNFTList] = useState<any[]>([]);

  /*const stacksAddress = useSelector(
    (state: any) => state.rootReducer.stacksAddress
  ); */
  const currentInvestmentValue = useSelector(
    (state: any) => state.rootReducer.investment
  );
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  const hardwareEfficiency = useSelector(
    (state: any) => state.rootReducer.hardwareEfficiency
  );

  const currentDurationValue = useSelector(
    (state: any) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state: any) => state.rootReducer.durationTitle
  );
  const powerPerDay: number = useSelector(
    (state: any) => state.rootReducer.electricityPerDay
  );
  const electricityCostPerKwh = useSelector(
    (state: any) => state.rootReducer.electricityCostPerKwh
  );

  const totalTHRented = useSelector(
    (state: any) => state.rootReducer.totalTHRented
  );

  const thrented = useSelector((state: any) => state.rootReducer.thRentPerDay);
  const currentDurationDiscount = useSelector(
    (state: any) => state.rootReducer.durationDiscount
  );

  //constants
  const currentSatsMined = useSelector(
    (state: any) => state.rootReducer.satsMined
  );
  const currentBTCMined = (currentSatsMined * 0.00000001).toFixed(6);
  const [investmentValue, setInvestmentValue] = useState(0);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
  }, [currentInvestmentValue]);

  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [latestNFTid, setLatestNFTid] = useState(0);
  const powerperMile = powerPerDay / 1000;
  const letPD = powerperMile * electricityCostPerKwh * 1000;
  const [loading, setLoading] = useState(false);
  const THRentPrice =
    currentInvestmentValue / (totalTHRented * currentDurationValue * 28);
  //const LETperDay =
  //  ((bla) * electricityCostPerKwh).toFixed(2) * 1000;
  const electricityCostPerDay = letPD / 1000;
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
  }, [currentDurationValue, currentDuration]);

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
      parseInt(Math.ceil(letPD).toFixed(0)),
      0,
      1,
      1
    );

    setLatestNFTid(parseInt(mint));
    setLoading(false);
    console.log("NFT id " + mint + " " + latestNFTid);
  };

  useEffect(() => {
    // Fetch Bitcoin price from CoinGecko API
    console.log("getting all");
    if (controllers) getAllNFTList();
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => {
        var btc = response.data.bitcoin.usd;
        setBitcoinPrice(btc);
        dispatch(changeBTCPriceToday(btc));
        //console.log("btc price today " + btc);
      })
      .catch((error) => {
        console.error("Error fetching Bitcoin price:", error);
      });
  }, []);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (currentICPAddress != "" && currentICPAddress != null) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [currentICPAddress]);

  //const loka = useSelector((state: any) => state.rootReducer.lokaCanister);
  const controllers = useSelector(
    (state: any) => state.rootReducer.controllers
  );

  const selectedMiningSite = useSelector(
    (state: any) => state.rootReducer.selectedMiningSite
  );

  // getting all NFT from all mining sites
  const getAllNFTList = async () => {
    if (loka && controllers && currentICPAddress) {
      controllers.forEach((item: any, index: any) => {
        var nftList_ = getNFTList(item);
      });
      //const nftList_ = await loka.getOwnedContracts();
      //setNFTList(nftList_);
    }
  };

  const getNFTList = async (canister: any) => {
    console.log("getting NFT from a site..");
    var nftList_ = await canister.getOwnedContracts();
    var newNftList = nftList; //nftList? newNftList.push(nftList_) : null;
    newNftList.push(nftList_);
    setNFTList(newNftList);
    console.log(newNftList);
    return nftList_;
  };

  useEffect(() => {
    console.log("thrented " + thrented);
  }, [thrented]);

  useEffect(() => {
    if (nftList.length > 0) {
      console.log("found " + nftList.length + " NFT ");
      console.log(nftList);
    }
  }, [nftList]);

  return (
    <div className="bg-btc-pattern w-full">
      <Head>
        <title>Loka </title>
        <meta
          content="Mint Loka Mining Contract"
          name="int Loka Mining Contract"
        />
        <link href="/favico_loka.png" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500&family=Open+Sans:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Navigation */}
      <nav className="w-full h-20 sm:h-16">
        {/* Navigation content */}
        <NavigationBar />
      </nav>
      {/* Buy Loka */}
      <div className="flex-grow flex flex-col md:flex-row h-full w-full lg:px-20   mx-auto justify-center items-start text-center">
        <div className="flex-grow flex flex-col md:flex-row lg:max-w-[90%]  mx-auto  ">
          <div className="w-full flex-grow flex flex-col ">
            {connected ? ( //check if connected
              <div className="flex-grow flex flex-col md:flex-row h-full w-full justify-start items-start text-left  mx-auto">
                <div className="sticky-div hidden lg:flex  items-end ">
                  <DashboardMenu selectedMenu={"Buy Loka"} />
                </div>

                <div className="h-full w-full mx-auto justify-start items-start text-center lg:text-left ">
                  <section className="lg:min-h-[80px]p-5 pt-10 pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white">
                    BUY LOKA
                  </section>
                  <section className="lg:flex ">
                    <MiningSiteCard />
                  </section>
                  <section className="lg:flex ">
                    <AmountCard />
                  </section>
                  <section className="lg:flex ">
                    <DurationCard />
                  </section>{" "}
                  {/**/}
                  <section className="lg:flex">
                    <SimulationCard />
                  </section>{" "}
                </div>

                <div className="sticky-div lg:max-w-[50%] w-full mx-auto mt-20  justify-start items-start lg:text-left text-center">
                  <section className="lg:min-h-[80px]p-5  pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white"></section>
                  <section className="p-0 lg:flex ">
                    <ReviewCard
                      genesisNFT={genesisNFT}
                      selectedMiningSite={selectedMiningSite}
                    />
                  </section>
                </div>

                <></>
              </div>
            ) : (
              <div className="h-full w-full mx-auto justify-center items-center text-center ">
                <ConnectWalletPrompt />
              </div>
            )}
            <section className=" p-5">{/*transaction*/}</section>
          </div>
        </div>
      </div>
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
      {connected && genesisNFT ? (
        <div className="w-full sticky-bottom  lg:hidden md:hidden flex bg-custom-blue  min-h-[120px]">
          <button className="w-full" onClick={buyLoka}>
            <BuyButton />
          </button>
        </div>
      ) : (
        <></>
      )}
      {/*<footer className="w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default BuyLoka;
