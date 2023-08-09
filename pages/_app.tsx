import "../styles/globals.css";

import type { AppProps } from "next/app";

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

function MyApp({ Component, pageProps }: AppProps) {
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
