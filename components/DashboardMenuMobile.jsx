import React from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const DashboardMenuMobile = () => {
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
    <div className="md:hidden h-[100vh] bg-opacity-20 mt-4 space-y-4 p-5 text-center justify-center transition duration-300 ease-in-out">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl mt-5 ">
          <Link href={card.link_address}>
            <a className="block text-gray-300 hover:text-gray-800">
              {card.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardMenuMobile;
