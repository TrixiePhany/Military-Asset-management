import React from 'react';
import background from '../assets/EveryPage.jpg';

export default function Transfers() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white w-full h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Transfers</h1>

        {/* Filter Section */}
        <div className="bg-[rgba(30,78,34,0.3)] p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center shadow-md">
          <div>
            <label className="block text-sm mb-1">From Date</label>
            <input
              type="date"
              className="text-black px-3 py-1 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">To Date</label>
            <input
              type="date"
              className="text-black px-3 py-1 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">From Base</label>
            <input
              type="text"
              placeholder="Base A"
              className="text-black px-3 py-1 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">To Base</label>
            <input
              type="text"
              placeholder="Base B"
              className="text-black px-3 py-1 rounded-md bg-white"
            />
          </div>
          <button className="ml-auto bg-[rgba(73,167,81,0.58)] hover:bg-[rgba(107,163,112,0.52)] text-white font-semibold px-4 py-2 rounded-md mt-6 md:mt-0">
            Apply Filters
          </button>
        </div>

        {/* Table Placeholder */}
        <div className="bg-[rgba(30,78,34,0.2)] p-4 rounded-lg shadow-md">
          <p className="text-white/80 italic">Transfer records will appear here once connected to backend.</p>
        </div>
      </div>
    </div>
  );
}
