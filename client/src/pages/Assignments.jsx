import React from 'react';
import background from '../assets/EveryPage.jpg';

export default function Assignments() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white w-full h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Assignments & Expenditures</h1>

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
            <label className="block text-sm mb-1">Personnel</label>
            <input
              type="text"
              placeholder="e.g. Officer A"
              className="text-black px-3 py-1 rounded-md bg-white"
            />
          </div>
          <button className="ml-auto bg-[rgba(73,167,81,0.58)] hover:bg-[rgba(107,163,112,0.52)] text-white font-semibold px-4 py-2 rounded-md mt-6 md:mt-0">
            Apply Filters
          </button>
        </div>

        {/* Assigned Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Assigned Assets</h2>
          <div className="bg-[rgba(30,78,34,0.2)] p-4 rounded-lg shadow-md">
            <p className="text-white/80 italic">Assigned asset data will appear here.</p>
          </div>
        </div>

        {/* Expended Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Expended Assets</h2>
          <div className="bg-[rgba(30,78,34,0.2)] p-4 rounded-lg shadow-md">
            <p className="text-white/80 italic">Expended asset data will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
