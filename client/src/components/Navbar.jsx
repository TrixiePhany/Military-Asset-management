import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full absolute top-0 left-0 flex justify-end p-6 text-white text-lg space-x-6 z-10">
      {['Home', 'About', 'Contact'].map((label) => (
        <a
          key={label}
          href="#"
          className="relative pb-1 transition-all duration-500 hover:border-b-2 hover:border-blue-600"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

