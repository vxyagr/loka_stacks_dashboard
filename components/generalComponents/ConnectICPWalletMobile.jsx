import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { useSelector, useDispatch } from "react-redux";
const appConfig = new AppConfig(["store_write", "publish_data"]);
import { createActor } from "../../ic/icloka";
//import StoicIdentity from "./ICPWalletComponents";
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

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWalletMobile = () => {
  const stacksAddress = useSelector((state) => state.rootReducer.stacksAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(JSON.stringify(userSession.isUserSignedIn()));
    if (userSession.isUserSignedIn()) {
      dispatch({
        type: "SET_STACKS_ADDRESS",
        payload: userSession.loadUserData().profile.stxAddress.testnet,
      });
    }
  }, [userSession.isUserSignedIn()]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [loka, setLoka] = useState(null);
  const [identity, setIdentity] = useState(false);
  const [connected, setConnected] = useState(false);
  const [stoicWallet, setStoicWallet] = useState(null);
  const [db, setDB] = useState("");

  useEffect(() => {
    // Load the client side components dynamically ONLY after the window is loaded
    loadWalletComponents();
  }, [typeof window]);

  const loadWalletComponents = () => {
    //console.log("type of window 2 " + typeof window);
    if (typeof window !== "undefined") {
      //console.log("type of window 3 " + typeof window);
      //window.addEventListener("load", () => {
      import("./ICPWalletComponents").then((module) => {
        setStoicWallet(() => module.default);
      });
      if (stoicWallet == null) setDB("none");
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
          setConnected(true);
        }
      });
    }
    if (stoicWallet == null) setDB("none");
    else setDB(JSON.stringify(stoicWallet));
  }, [stoicWallet]);

  const connectLokaCanister = async () => {
    var options = {};
    options["identity"] = identity;
    var loka_ = createActor("bkyz2-fmaaa-aaaaa-qaaaq-cai", options);
    //const greeting = await loka_.greet("yes");
    //console.log(greeting);
    setLoka(loka_);
  };

  useEffect(() => {
    if (identity) {
      console.log(identity.getPrincipal().toText() + " connected " + connected);
      connectLokaCanister();
    }
  }, [connected]);

  const login = async (t) => {
    if (!stoicWallet || stoicWallet === "undefined") return;
    stoicWallet.load().then(async (identity) => {
      if (identity !== false) {
        //ID is a already connected wallet!
      } else {
        //No existing connection, lets make one!
        try {
          var identity = await stoicWallet.connect();
        } catch (err) {}
      }
      setIdentity(identity);
      setConnected(true);
      //Lets display the connected principal!
    });
  };
  function disconnect() {
    userSession.signUserOut("/");
    stoicWallet.disconnect();
    setConnected(false);
  }
  const [appLoaded, setAppLoaded] = useState(false);

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
        Connect {db}
      </button>
    </div>
  );
};

export default ConnectWalletMobile;
