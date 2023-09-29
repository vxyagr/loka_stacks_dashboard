import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { useSelector, useDispatch } from "react-redux";
import { StoicIdentity } from "ic-stoic-identity";
const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });
const [identity, setIdentity] = useState(false);
function authenticate() {
  showConnect({
    appDetails: {
      name: "Lokaverse Whitelist",
      icon: window.location.origin + "/logo512.png",
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

const login = async (t) => {
  loader(true, "Connecting your wallet...");
  try {
    var id;
    switch (t) {
      case "stoic":
        id = await StoicIdentity.connect();
        if (id) {
          setIdentity(id);
          id.accounts().then((accs) => {
            setAccounts(JSON.parse(accs));
          });
          setCurrentAccount(0);
          localStorage.setItem("_loginType", t);
        } else {
          throw new Error("Failed to connect to your wallet");
        }
        break;
      /*case 'torus':
              const openlogin = await loadOpenLogin();
              if (openlogin.privKey) {
                  await openlogin.logout();
              }
              await openlogin.login();
              id = Ed25519KeyIdentity.generate(
                  new Uint8Array(fromHexString(openlogin.privKey)),
              );
              if (id) {
                  setIdentity(id);
                  setAccounts([
                      {
                          name: 'Torus Wallet',
                          address: extjs.toAddress(id.getPrincipal().toText(), 0),
                      },
                  ]);
                  setCurrentAccount(0);
                  localStorage.setItem('_loginType', t);
              } else {
                  throw new Error('Failed to connect to your wallet');
              }
              break;
          case 'plug':
          case 'infinityWallet':
              var result = await window.ic[t].requestConnect({
                  whitelist: whitelistedCanisters(),
              });
              if (result) {
                  var p = await window.ic[t].getPrincipal();
                  var id = {
                      type: t,
                      getPrincipal: () => p,
                  };
                  setIdentity(id);
                  setAccounts([
                      {
                          name: capitalize(t),
                          address: extjs.toAddress(id.getPrincipal().toText(), 0),
                      },
                  ]);
                  setCurrentAccount(0);
                  localStorage.setItem('_loginType', t);
              } else {
                  throw new Error('Failed to connect to your wallet');
              }
              break; */
      default:
        break;
    }
  } catch (e) {
    error(e);
  }
  loader(false);
};

const ConnectWallet = () => {
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
