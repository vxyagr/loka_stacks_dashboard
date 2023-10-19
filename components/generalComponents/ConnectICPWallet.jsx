import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { AuthClient } from "@dfinity/auth-client";
import { useSelector, useDispatch } from "react-redux";
import {
  changeConnected,
  changeControllers,
  changeICPAddress,
  changeLokaCanister,
  changeMiningSites,
} from "../../redux/actions";
//import { StoicIdentity } from "ic-stoic-identity";
import { Route, Routes, useLocation } from "react-router-dom";
//const StoicIdentity = dynamic(() => import(
import dynamic from "next/dynamic";
import { createActor } from "../../ic/icloka";
import { createActor as createControllers } from "../../ic/iccontrollers";
import { list } from "postcss";

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

const ConnectWallet = () => {
  const [loka, setLoka] = useState(null);
  const [identity, setIdentity] = useState(false);

  const [stoicWallet, setStoicWallet] = useState(null);
  const [ICPaddr, setICPaddr] = useState(null);
  const reduxConnected = useSelector((state) => state.rootReducer.connected);
  const [connected, setConnected] = useState(reduxConnected);
  useEffect(() => {
    // Load the client side components dynamically ONLY after the window is loaded
    loadWalletComponents();
  }, [typeof window]);

  const loadWalletComponents = () => {
    if (typeof window !== "undefined") {
      import("./ICPWalletComponents").then((module) => {
        setStoicWallet(() => module.default);
      });
    }
  };

  useEffect(() => {
    console.log("setting identity");

    if (stoicWallet) {
      stoicWallet.load().then(async (identity) => {
        if (identity !== false) {
          console.log("logged in");
          setIdentity(identity);
          setICPaddr(identity.getPrincipal().toText());
        } else {
          console.log("not logged in");
        }
      });
    }
  }, [stoicWallet]);

  const connectLokaCanister = async () => {
    if (!identity || !stoicWallet) return;
    var options = {};
    options["identity"] = identity; //bnz7o-iuaaa-aaaaa-qaaaa-cai    b77ix-eeaaa-aaaaa-qaada-cai
    console.log("connecting to main canister with identity " + identity);
    var canisterAddress = process.env.LOKA_CANISTER;
    //c2lt4-zmaaa-aaaaa-qaaiq-cai
    canisterAddress = "l4mjr-aiaaa-aaaak-qcnmq-cai";
    //canisterAddress = "c2lt4-zmaaa-aaaaa-qaaiq-cai";
    console.log("canister address " + canisterAddress);
    var loka_ = createActor(canisterAddress, options);
    setLoka(loka_);
  };

  useEffect(() => {
    console.log("checking identity");
    if (identity) {
      connectLokaCanister();
    } else {
      console.log("identity not foud");
    }
  }, [connected, identity]);

  useEffect(() => {
    if (loka) {
      dispatch(changeLokaCanister(loka));
      getAllControllers();
    }
  }, [loka]);

  const getAllControllers = async () => {
    console.log("getting list of loka mining site controllers");
    var controllers = [];
    var listOfControllers = await loka.getMiningSites();
    var miningSites = [];
    var options = {};
    options["identity"] = identity;
    listOfControllers.forEach((item, index) => {
      var cont_ = createControllers(
        item.controllerCanisterId.toString(),
        options
      );
      controllers.push(cont_);
      miningSites.push(item);
    });
    dispatch(changeControllers(controllers));
    dispatch(changeMiningSites(miningSites));
    console.log(
      "found " + controllers.length + " mining sites and Loka NFT series"
    );
  };

  const login = async (t) => {
    stoicWallet.load().then(async (identity) => {
      var identity_ = "";
      if (identity !== false) {
        setIdentity(identity);
      } else {
        //No existing connection, lets make one!
        identity_ = await stoicWallet.connect();
        setIdentity(identity_);
      }
      dispatch(changeICPAddress(identity_.getPrincipal().toText()));
      setICPaddr(identity_.getPrincipal().toText());
    });
  };

  function disconnect() {
    userSession.signUserOut("/");
    stoicWallet.disconnect();
    setConnected(false);
    dispatch(changeConnected(false));
    dispatch(changeICPAddress(""));
  }

  useEffect(() => {
    if (ICPaddr && ICPaddr != "") {
      setConnected(true);
      dispatch(changeConnected(true));
      console.log("ip " + ICPaddr);
      dispatch(changeICPAddress(ICPaddr));
    }
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
      <div>
        <button
          onClick={disconnect}
          className="bg-gradient-to-r from-blue-500 rounded-full to-purple-600 text-white lg:text-lg md:text-base text-base  lg:py-1 lg:px-4 py-1 px-4 leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 sm:text-2xl  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
        >
          Disconnect
        </button>
        {/*<p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>*/}
      </div>
    );
  }

  return (
    <button
      //onClick={authenticate}
      onClick={login}
      className="bg-gradient-to-r from-blue-500 rounded-full to-purple-600 text-white lg:text-lg md:text-base text-base lg:py-1 lg:px-4 py-1 px-4 leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 sm:text-2xl  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
    >
      Connect
    </button>
  );
};

export default ConnectWallet;
