import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public"; // pages/_app.js
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import BackgroundWrapper from "../components/BGWrapper";
import { wrapper } from "../redux/store";
import { Connect } from "@stacks/connect-react";

import { userSession } from "../components/ConnectHiroWallet";
config.autoAddCss = false;
library.add(faBars);

// The rest of your _app.js file

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  let icon = "";
  if (typeof window !== "undefined") {
    icon = window.location.origin + "/loka-icon.png";
  }
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default wrapper.withRedux(MyApp);
