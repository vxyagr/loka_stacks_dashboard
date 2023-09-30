import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import DashboardMenuMobile from "./DashboardMenuMobile";
//import ConnectWallet from "../components/generalComponents/ConnectHiroWallet";
import ConnectWallet from "./ConnectICPWallet";
//import ConnectWalletMobile from "../components/generalComponents/ConnectHiroWalletMobile";
import ConnectWalletMobile from "./ConnectICPWalletMobile";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const btcPriceToday = useSelector((state) => state.rootReducer.btcPriceToday);
  const [showMenu, setShowMenu] = useState(false);
  const [grt, setGrt] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed min-h-20 top-0 z-50 w-full bg-custom-blue">
      <nav className="bg-custom-blue backdrop-blur-md h-full">
        <div className="w-full lg:hidden md:flex  container mx-auto px-4 md:px-6 flex min-h-[50px] justify-between items-center text-center">
          <div className="w-15  justify-center items-center text-center p-4">
            <Link href="/">
              <a className="text-xl font-semibold">
                <Icon />
              </a>
            </Link>
          </div>
          <div className="flex-grow justify-center items-center text-center p-4">
            <ConnectWalletMobile />
          </div>
          <div className="w-12 h-12 justify-center items-center text-center p-4 pt-3">
            <button
              className=" focus:outline-none"
              type="button"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6  ">
          <div className=" justify-between items-center py-4 hidden lg:flex ">
            <Link href="/">
              <a className="text-xl font-semibold">
                <Logo />
              </a>
            </Link>
            <div className="hidden md:flex space-x-8">
              <div className="text-white">
                BTC/USD :{" "}
                <span className="text-[#79D5C6]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(btcPriceToday)}
                </span>
              </div>
              {/*} <Link href="https://lifeandwork.notion.site/Loka-Mining-Platform-Overview-a214238d662c49739d2bdb8761e2addc?pvs=4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800"
                >
                  Docs
                </a>
                </Link> */}
            </div>
            <button
              className="md:hidden focus:outline-none"
              type="button"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="text-gray-500" />
            </button>
            <ConnectWallet />
          </div>
          {showMenu && <DashboardMenuMobile />}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
