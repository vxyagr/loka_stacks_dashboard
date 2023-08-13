import "../styles/globals.css";

import type { AppProps } from "next/app";

import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import BackgroundWrapper from "../components/BGWrapper";
import { wrapper } from "../redux/store";
import { Connect } from "@stacks/connect-react";
import { useSelector, useDispatch } from "react-redux";
import { userSession } from "../components/ConnectHiroWallet";
config.autoAddCss = false;
library.add(faBars);
import { changeBTCPriceToday } from "../redux/actions";
import axios from "axios";
import { useState, useEffect } from "react";
// The rest of your _app.js file

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
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
  let icon = "";
  if (typeof window !== "undefined") {
    icon = window.location.origin + "/loka-icon.png";
  }
  return (
    <BackgroundWrapper>
      <Connect
        authOptions={{
          appDetails: {
            name: "Stacks Next.js Template",
            icon,
          },
          redirectTo: "/",
          onFinish: () => {
            window.location.reload();
          },
          userSession,
        }}
      >
        <Component {...pageProps} />
      </Connect>
    </BackgroundWrapper>
  );
}

export default wrapper.withRedux(MyApp);
