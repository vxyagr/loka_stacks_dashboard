import React from "react";
import "tailwindcss/tailwind.css";

const DashboardMenu = () => {
  const cards = [
    {
      title: "Dashboard",
      content:
        "Our mining operations are backed by an abundant supply of renewable energy, ensuring a sustainable and environmentally-friendly approach to Bitcoin mining.",
      img: "electrical_services-icon.svg",
    },
    {
      title: "Buy Loka",
      content:
        "With less than $0.04/kWh and 24/7 availability on any season, our strategic location in Indonesia allows us to take advantage of some of the lowest electricity costs in the world, maximizing your mining profits.",
      img: "eco_icon.svg",
    },
    {
      title: "My Loka",
      content:
        "Our unique combination of low electricity costs and high-performance mining hardware ensures a rapid return on investment, with most users experiencing around 40% APR.",
      img: "monetization_icon.svg",
    },
    {
      title: "Staking",
      content:
        "Our unique combination of low electricity costs and high-performance mining hardware ensures a rapid return on investment, with most users experiencing around 40% APR.",
      img: "monetization_icon.svg",
    },
    {
      title: "Guides",
      content:
        "Our unique combination of low electricity costs and high-performance mining hardware ensures a rapid return on investment, with most users experiencing around 40% APR.",
      img: "monetization_icon.svg",
    },
  ];
  return (
    <div className="min-w-[200px] h-full ml-10 mt-20 grid">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl mt-5 pl-5">
          <h1 className=" p-2 text-white text-md lexend-light opacity-100 items-center justify-items-start text-left">
            {card.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default DashboardMenu;
