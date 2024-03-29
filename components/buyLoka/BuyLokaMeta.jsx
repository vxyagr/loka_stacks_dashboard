import { FunctionComponent } from "react";

/**
 * HomePageMetaProps is a React Component properties that passed to React Component HomePageMeta
 */

/**
 * HomePageMeta is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const BuyLokaMeta = ({}) => {
  return (
    <>
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://dev-dashboard.lokamining.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Loka Mining" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="og:description"
        content="Get bitcoin at discounted rate! Green and renewable energy powered flexible-term bitcoin mining contract starts from $100"
      />
      <meta
        property="og:image"
        content="hhttps://dev-dashboard.lokamining.com/loka_icon.png"
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="lokamining.com" />
      <meta property="twitter:url" content="https://twitter.com/lokamining" />
      <meta name="twitter:title" content="Loka Mining" />
      <meta
        name="twitter:description"
        content="Get bitcoin at discounted rate! Green and renewable energy powered flexible-term bitcoin mining contract starts from $100"
      />
      <meta name="twitter:image" content="" />
    </>
  );
};

export default BuyLokaMeta;
