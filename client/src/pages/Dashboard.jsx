import React, { useState } from 'react';
import background from '../assets/EveryPage.jpg';

const metrics = [
  { title: 'Opening Balance', value: '1,200' },
  { title: 'Closing Balance', value: '1,150' },
  { title: 'Net Movement (click for pop-up)', value: '+50', span: true },
  { title: 'Assigned', value: '20' },
  { title: 'Expended', value: '250' },
];

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  const handleMetricClick = (title) => {
    if (title === 'Net Movement') {
      setShowPopup(!showPopup);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white w-full h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Filter Section */}
        <div className="bg-[rgba(30,78,34,0.3)] p-4 rounded-lg mb-8 flex flex-wrap gap-4 items-center shadow-md">
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
            <label className="block text-sm mb-1">Asset Type</label>
            <select className="text-black px-3 py-1 rounded-md bg-white">
              <option value="">All</option>
              <option value="vehicles">Vehicles</option>
              <option value="weapons">Weapons</option>
              <option value="supplies">Supplies</option>
            </select>
          </div>
          <button className="ml-auto bg-[rgba(73,167,81,0.58)] hover:bg-[rgba(107,163,112,0.52)] text-white font-semibold px-4 py-2 rounded-md mt-6 md:mt-0">
            Apply Filters
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 h-90 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto] gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              onClick={() => handleMetricClick(metric.title)}
              className={`cursor-pointer w-full ${
                metric.span ? 'lg:row-span-2' : ''
              } bg-[rgba(30,78,34,0.3)] p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300`}
            >
              <h2 className="text-xl font-semibold">{metric.title}</h2>
              <p className="text-3xl mt-2 font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Popup Section */}
        {showPopup && (
  <div className="mt-12 bg-[rgba(30,78,34,0.7)] p-6 rounded-xl shadow-lg backdrop-blur-sm">
    <h3 className="text-2xl font-bold mb-4">Net Movement Details</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <h4 className="text-lg font-semibold">Purchases</h4>
        <p className="mt-2 text-white/90">120 Vehicles purchased on 2025-06-10</p>
        <p className="mt-1 text-white/90">80 Weapons purchased on 2025-06-18</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Transfer In</h4>
        <p className="mt-2 text-white/90">30 Vehicles transferred from Base Bravo</p>
        <p className="mt-1 text-white/90">20 Supplies transferred from Base Alpha</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Transfer Out</h4>
        <p className="mt-2 text-white/90">25 Weapons sent to Base Echo</p>
        <p className="mt-1 text-white/90">15 Vehicles dispatched to Base Zulu</p>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
