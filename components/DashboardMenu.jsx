import React from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const DashboardMenu = ({ selectedMenu }) => {
  const cards = [
    {
      title: "Dashboard",
      link_address: "/",
    },
    {
      title: "Buy Loka",
      link_address: "/buy",
    },
    {
      title: "My Loka",
      link_address: "/myloka",
    },
    {
      title: "Staking",
      link_address: "#",
    },
    {
      title: "Transaction History",
      link_address: "#",
    },
    {
      title: "Guides",
      link_address: "#",
    },
    {
      title: "Testnet STX Faucet",
      link_address: "#",
    },
  ];
  return (
    <div className="min-w-[300px] h-full p-10  grid mt-10 ">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl mt-5 ">
          <Link href={card.link_address}>
            <h1
              className={`p-2 cursor-pointer transition duration-300 ease-in-out  text-md lexend-light opacity-100 rounded-xl items-center justify-items-start text-left ${
                selectedMenu == card.title
                  ? "bg-dashboard-gold  text-dashboard-blue font-bold"
                  : "text-white hover:bg-dashboard-gray "
              }`}
            >
              <a>{card.title}</a>
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardMenu;
