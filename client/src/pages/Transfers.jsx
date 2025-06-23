import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [filters, setFilters] = useState({
    fromBase: '',
    toBase: '',
    startDate: '',
    endDate: '',
    assetType: ''
  });

  const fetchTransfers = async () => {
    try {
      const token = localStorage.getItem('token');
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:3000/api/transfers?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransfers(res.data);
    } catch (err) {
      console.error('Error fetching transfers', err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Transfer Records</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-[rgba(30,78,34,0.3)] p-4 rounded-lg">
        <input
          type="text"
          name="fromBase"
          placeholder="From Base ID"
          value={filters.fromBase}
          onChange={handleChange}
          className="px-3 py-2 text-black rounded"
        />
        <input
          type="text"
          name="toBase"
          placeholder="To Base ID"
          value={filters.toBase}
          onChange={handleChange}
          className="px-3 py-2 text-black rounded"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="px-3 py-2 text-black rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="px-3 py-2 text-black rounded"
        />
        <select
          name="assetType"
          value={filters.assetType}
          onChange={handleChange}
          className="px-3 py-2 text-black rounded"
        >
          <option value="">All Types</option>
          <option value="vehicle">Vehicles</option>
          <option value="weapon">Weapons</option>
          <option value="supplies">Supplies</option>
        </select>
        <button
          onClick={fetchTransfers}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
        <thead className="bg-green-900">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Asset</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">From Base</th>
            <th className="px-4 py-2">To Base</th>
            <th className="px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id} className="text-center border-t border-green-700">
              <td className="px-4 py-2">{new Date(transfer.transfer_date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{transfer.asset_name}</td>
              <td className="px-4 py-2">{transfer.asset_type}</td>
              <td className="px-4 py-2">{transfer.from_base_name}</td>
              <td className="px-4 py-2">{transfer.to_base_name}</td>
              <td className="px-4 py-2">{transfer.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
