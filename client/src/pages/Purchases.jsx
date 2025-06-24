// pages/Purchases.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../assets/EveryPage.jpg';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({
    baseId: '',
    startDate: '',
    endDate: '',
    equipmentType: ''
  });

  const [newPurchase, setNewPurchase] = useState({
    base_id: '',
    asset_id: '',
    // quantity: '',
    date: ''
  });
  const [formMsg, setFormMsg] = useState('');

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(res.data);
    } catch (err) {
      console.error('Error fetching purchases', err);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCreatePurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/purchases', newPurchase, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormMsg('Purchase recorded successfully!');
      setNewPurchase({ base_id: '', asset_id: '', quantity: '', date: '' });
      fetchPurchases();
    } catch (err) {
      console.error('Error creating purchase:', err);
      setFormMsg('Failed to record purchase.');
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white w-full h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Purchases</h1>

        {/* Filter Section */}
        <div className="bg-[rgba(30,78,34,0.3)] p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center shadow-md">
          <input
            type="text"
            name="baseId"
            placeholder="Base ID"
            value={filters.baseId}
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
            name="equipmentType"
            value={filters.equipmentType}
            onChange={handleChange}
            className="px-3 py-2 text-black rounded"
          >
            <option value="">All Types</option>
            <option value="vehicle">Vehicles</option>
            <option value="weapon">Weapons</option>
            <option value="supplies">Supplies</option>
          </select>
          <button
            onClick={fetchPurchases}
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
              <th className="px-4 py-2">Base</th>
              {/* <th className="px-4 py-2">Quantity</th> */}
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="text-center border-t border-green-700">
                <td className="px-4 py-2">{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{purchase.asset}</td>
                <td className="px-4 py-2">{purchase.type}</td>
                <td className="px-4 py-2">{purchase.base}</td>
                {/* <td className="px-4 py-2">{purchase.quantity}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create Purchase Form */}
        <h2 className="text-xl font-bold mt-10 mb-4">Record New Purchase</h2>
        <div className="bg-[rgba(204,213,205,0.84)] p-4 rounded-lg flex flex-col gap-4 max-w-xl">
          <input
            type="number"
            placeholder="Base ID"
            value={newPurchase.base_id}
            onChange={(e) => setNewPurchase({ ...newPurchase, base_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <input
            type="number"
            placeholder="Asset ID"
            value={newPurchase.asset_id}
            onChange={(e) => setNewPurchase({ ...newPurchase, asset_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          {/* <input
            type="number"
            placeholder="Quantity"
            value={newPurchase.quantity}
            onChange={(e) => setNewPurchase({ ...newPurchase, quantity: e.target.value })}
            className="px-3 py-2 text-black rounded"
          /> */}
          <input
            type="date"
            value={newPurchase.date}
            onChange={(e) => setNewPurchase({ ...newPurchase, date: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <button
            onClick={handleCreatePurchase}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Add Purchase
          </button>
          {formMsg && <p className="text-sm text-green-400">{formMsg}</p>}
        </div>
      </div>
    </div>
  );
}
