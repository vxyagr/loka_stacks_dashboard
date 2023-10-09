import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { useSelector, useDispatch } from "react-redux";
import { changeICPAddress, changeLokaCanister } from "../../redux/actions";
//import { StoicIdentity } from "ic-stoic-identity";
import { Route, Routes, useLocation } from "react-router-dom";
//const StoicIdentity = dynamic(() => import(
import dynamic from "next/dynamic";
import { createActor } from "../../ic/icloka";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Loka",
      icon: window.location.origin + "/loka_icon.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

const ConnectWalletMobile = () => {
  const [loka, setLoka] = useState(null);
  const [identity, setIdentity] = useState(false);
  const [connected, setConnected] = useState(false);
  const [stoicWallet, setStoicWallet] = useState(null);
  const [ICPaddr, setICPaddr] = useState(null);

  useEffect(() => {
    // Load the client side components dynamically ONLY after the window is loaded
    loadWalletComponents();
    //console.log("type of window " + typeof window);
  }, [typeof window]);

  const loadWalletComponents = () => {
    //console.log("type of window 2 " + typeof window);
    if (typeof window !== "undefined") {
      //console.log("type of window 3 " + typeof window);
      //window.addEventListener("load", () => {
      import("./ICPWalletComponents").then((module) => {
        setStoicWallet(() => module.default);
      });
      //});
      //console.log("dynamic component loaded");
    }
  };

  useEffect(() => {
    if (stoicWallet) {
      stoicWallet.load().then(async (identity) => {
        if (identity !== false) {
          //ID is a already connected wallet!
          setIdentity(identity);
          setICPaddr(identity.getPrincipal().toText());
          //setConnected(true);
        }
      });
    }
  }, [stoicWallet]);

  const connectLokaCanister = async () => {
    if (!identity || !stoicWallet) return;
    var options = {};
    options["identity"] = identity;
    var loka_ = createActor("a4tbr-q4aaa-aaaaa-qaafq-cai", options);

    setLoka(loka_);
  };

  useEffect(() => {
    if (identity) {
      //console.log(identity.getPrincipal().toText() + " connected " + connected);
      connectLokaCanister();
    }
  }, [connected]);

  useEffect(() => {
    if (loka) dispatch(changeLokaCanister(loka));
  }, [loka]);

  const login = async (t) => {
    //console.log("lol");
    stoicWallet.load().then(async (identity) => {
      var identity_ = "";
      if (identity !== false) {
        //ID is a already connected wallet!
        setIdentity(identity);
      } else {
        //No existing connection, lets make one!
        identity_ = await stoicWallet.connect();
        setIdentity(identity_);
      }
      dispatch(changeICPAddress(identity_.getPrincipal().toText()));
      setICPaddr(identity_.getPrincipal().toText());
      //Lets display the connected principal!
    });
  };
  function disconnect() {
    userSession.signUserOut("/");
    stoicWallet.disconnect();
    setConnected(false);
    dispatch(changeICPAddress(""));
  }
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (ICPaddr && ICPaddr != "") setConnected(true);
    console.log("ip " + ICPaddr);
    dispatch(changeICPAddress(ICPaddr));
  }, [ICPaddr]);

  const stacksAddress = useSelector((state) => state.rootReducer.stacksAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(JSON.stringify(userSession.isUserSignedIn()));
    if (userSession.isUserSignedIn()) {
      dispatch({
        type: "SET_STACKS_ADDRESS",
        payload: userSession.loadUserData().profile.stxAddress.testnet,
      });
    }
  }, [userSession.isUserSignedIn()]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (connected) {
    return (
      <div className="w-full">
        <button
          onClick={disconnect}
          className="w-full  bg-gradient-to-r from-blue-500 rounded-full to-purple-600 text-white lg:text-lg md:text-base text-base  lg:py-1 lg:px-4 py-3 px-4 leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 sm:text-2xl  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
        >
          Disconnect
        </button>
        {/*<p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>*/}
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        //onClick={authenticate}
        onClick={login}
        className="w-full  bg-gradient-to-r from-blue-500 rounded-full to-purple-600 text-white lg:text-lg md:text-base text-base lg:py-1 lg:px-4 py-3 px-4 leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 sm:text-2xl  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
      >
        Connect {ICPaddr}
      </button>
    </div>
  );
};

export default ConnectWalletMobile;
