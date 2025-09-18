import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaExchangeAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const links = [
    { name: "Dashboard", to: "/dashboard", icon: <FaHome />, roles: ["admin", "base_commander", "logistics_officer"] },
    { name: "Purchases", to: "/purchases", icon: <FaShoppingCart />, roles: ["admin", "logistics_officer"] },
    { name: "Transfers", to: "/transfers", icon: <FaExchangeAlt />, roles: ["admin", "logistics_officer"] },
    { name: "Assignments", to: "/assignments", icon: <FaUsers />, roles: ["admin", "base_commander"] },
  ];

  const allowedLinks = links.filter(link => link.roles.includes(role));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="group h-screen bg-gray-900 text-white fixed top-0 left-0 transition-all duration-300 ease-out w-20 hover:w-60 z-50 flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold hidden group-hover:block">
          Menu
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {allowedLinks.map((link) => (
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

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-4 p-2 rounded w-full hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="hidden group-hover:inline text-md">Logout</span>
        </button>
      </div>
    </div>
  );
}
