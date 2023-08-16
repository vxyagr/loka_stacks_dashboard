import type { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/Navigation";
import AmountCard from "../../components/buyLoka/AmountCard";
import DurationCard from "../../components/buyLoka/DurationCard";
import ReviewCard from "../../components/buyLoka/ReviewCard";
import SimulationCard from "../../components/buyLoka/SimulationCard";
import DashboardMenu from "../../components/DashboardMenu";
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
import { userSession } from "../../components/generalComponents/ConnectHiroWallet";
import Head from "next/head";

const BuyLoka: NextPage = () => {
  const stacksAddress = 1;
  const genesisNFT = true;
  const dispatch = useDispatch();
  /*const stacksAddress = useSelector(
    (state: any) => state.rootReducer.stacksAddress
  ); */
  const currentInvestmentValue = useSelector(
    (state: any) => state.rootReducer.investment
  );
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    // Fetch Bitcoin price from CoinGecko API
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => {
        var btc = response.data.bitcoin.usd;
        setBitcoinPrice(btc);
        dispatch(changeBTCPriceToday(btc));
        console.log("btc price today " + btc);
      })
      .catch((error) => {
        console.error("Error fetching Bitcoin price:", error);
      });
  }, []);

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
            <div className="flex-grow flex flex-col md:flex-row h-full w-full justify-start items-start text-left  mx-auto">
              {stacksAddress ? (
                <div className="sticky-div hidden lg:flex md:flex items-end ">
                  <DashboardMenu selectedMenu={"Buy Loka"} />
                </div>
              ) : (
                <></>
              )}
              {stacksAddress && genesisNFT ? (
                <div className="h-full w-full mx-auto justify-start items-start text-center lg:text-left ">
                  <section className="lg:min-h-[80px]p-5 pt-10 pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white">
                    BUY LOKA
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
              ) : (
                <div className="h-full w-full mx-auto justify-center items-center text-center ">
                  {stacksAddress ? (
                    genesisNFT ? (
                      ""
                    ) : (
                      <InputGenesisNFTPrompt />
                    )
                  ) : (
                    <ConnectWalletPrompt />
                  )}
                </div>
              )}
              {stacksAddress && genesisNFT ? (
                <div className="sticky-div lg:max-w-[50%] w-full mx-auto mt-20  justify-start items-start lg:text-left text-center">
                  <section className="lg:min-h-[80px]p-5  pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white"></section>
                  <section className="p-0 lg:flex ">
                    <ReviewCard />
                  </section>
                </div>
              ) : (
                <></>
              )}
            </div>
            <section className=" p-5">{/*transaction*/}</section>
          </div>
        </div>
      </div>
      {stacksAddress && genesisNFT ? (
        <div className="w-full sticky-bottom  lg:hidden md:hidden flex bg-custom-blue  min-h-[120px]">
          <BuyButton />
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
