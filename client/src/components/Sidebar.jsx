import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaExchangeAlt,
  FaUsers,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", to: "/dashboard", icon: <FaHome /> },
    { name: "Purchases", to: "/purchases", icon: <FaShoppingCart /> },
    { name: "Transfers", to: "/transfers", icon: <FaExchangeAlt /> },
    { name: "Assignments", to: "/assignments", icon: <FaUsers /> },
  ];

  return (
    <div className="group h-screen bg-gray-900 text-white fixed top-0 left-0 transition-all duration-300 ease-out w-20 hover:w-60 z-50">
      <div className="p-4 text-xl font-bold hidden group-hover:block">
        Menu
      </div>
      <div className="flex flex-col space-y-4 p-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`flex items-center space-x-4 p-2 rounded hover:bg-[#2b411ca2] transition-colors ${
  location.pathname === link.to ? "bg-[#2B411C]" : ""
            }`}
          >
            <div className="text-xl">{link.icon}</div>
            <span className="hidden group-hover:inline text-md">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
