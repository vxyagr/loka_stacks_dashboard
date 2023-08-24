import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { useSelector, useDispatch } from "react-redux";
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

  if (mounted && userSession.isUserSignedIn()) {
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
        onClick={authenticate}
        className="w-full  bg-gradient-to-r from-blue-500 rounded-full to-purple-600 text-white lg:text-lg md:text-base text-base lg:py-1 lg:px-4 py-3 px-4 leading-none tracking-tight hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 sm:text-2xl  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectWalletMobile;
