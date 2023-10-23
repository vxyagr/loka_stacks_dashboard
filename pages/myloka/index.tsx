import type { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/generalComponents/Navigation";
import NFTDashboard from "../../components/home/NFTDashboard";
import ContractDashboard from "../../components/myLoka/ContractDashboard";
import TokenDashboard from "../../components/home/TokenDashboard";
import MiningDashboard from "../../components/home/MiningDashboard";
import DashboardMenu from "../../components/generalComponents/DashboardMenu";
import ConnectWalletPrompt from "../../components/generalComponents/ConnectWalletPrompt";
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

const MyLoka: NextPage = () => {
  const dispatch = useDispatch();
  const [nftList, setNFTList] = useState<any[]>([]);
  const [controllerList, setControllerList] = useState<any[]>([]);
  const [emptyList, setEmptyList] = useState<any[]>([]);
  const currentInvestmentValue = useSelector(
    (state: any) => state.rootReducer.investment
  );
  const currentICPAddress = useSelector(
    (state: any) => state.rootReducer.icpAddress
  );
  /*const stacksAddress = useSelector(
    (state: any) => state.rootReducer.stacksAddress
  ); */
  const loka = useSelector((state: any) => state.rootReducer.lokaCanister);
  const controllers = useSelector(
    (state: any) => state.rootReducer.controllers
  );

  // getting all NFT from all mining sites
  const getAllNFTList = async () => {
    if (loka && controllers && currentICPAddress) {
      controllers.forEach((item: any, index: any) => {
        var nftList_: any = getNFTList(item);
      });
      //const nftList_ = await loka.getOwnedContracts();
      setNFTList(emptyList);
      setEmptyList([]);
      console.log("done fetching all NFT");
      console.log(nftList);
    }
  };

  const getNFTList = async (canister: any) => {
    console.log("getting NFT from a site..");
    var nftList_ = await canister.getOwnedContracts();
    console.log("fetched " + nftList_.length + " contracts");
    nftList_.forEach((item: any, index: any) => {
      //var nftList_: any = getNFTList(item);
      item.controller = canister;
    });
    console.log(nftList_);
    if (nftList_.length > 0) setNFTList(emptyList.concat(nftList_));
    return nftList_;
  };

  useEffect(() => {
    if (controllers) getAllNFTList();
  }, [controllers]);

  useEffect(() => {
    if (nftList.length > 0) {
      console.log("found " + nftList.length + " NFT ");
      console.log(nftList);
    }
  }, [nftList]);
  const stacksAddress = 1;
  return (
    <div className="bg-btc-pattern w-full">
      <Head>
        <title>Loka</title>
        <meta content="Loka" name="description" />
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
            {" "}
            {currentICPAddress != "" && currentICPAddress != null ? (
              <div className="flex-grow flex flex-col md:flex-row h-full w-full justify-start items-start text-left  mx-auto ">
                <div className="sticky-div hidden lg:flex items-end ">
                  <DashboardMenu selectedMenu={"My Loka"} />
                </div>
                <div className="h-full w-full mx-auto justify-start items-start text-center lg:text-left md:min-w-[900px] lg:min-w-[900px] ">
                  <section className="lg:min-h-[80px]p-5 pt-10 pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white">
                    MY LOKA
                  </section>
                  {nftList.map((nft, index) => (
                    <section key={index} className="lg:flex p-5 ">
                      <ContractDashboard
                        image={"lokaNFT.png"}
                        nft={nft}
                        controller={nft.controller}
                      />
                    </section>
                  ))}
                </div>
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

      {/*<footer className="w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default MyLoka;
