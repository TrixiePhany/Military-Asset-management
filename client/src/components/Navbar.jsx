import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  

  return (
    <nav className="w-full absolute top-0 left-0 flex justify-end p-6 text-white text-lg space-x-6 z-10">
      {['Home', 'About', 'Contact'].map((label) => (
        <a
          key={label}
          href="#"
          className="relative pb-1 transition-all ease-in-out duration-500 hover:border-b-2 hover:border-amber-700"
        >
          {label}
        </a>
      ))}
   
    </nav>
  );
}
