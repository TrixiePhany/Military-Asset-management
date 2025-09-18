import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../assets/EveryPage.jpg';

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    from_base_id: '',
    to_base_id: '',
    asset_id: '',
    date: ''
  });
  const [formMsg, setFormMsg] = useState('');

  const fetchTransfers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/transfers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransfers(res.data);
    } catch (err) {
      console.error('Error fetching transfers:', err);
    }
  };

  const handleCreateTransfer = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/transfers', {
        from_baseid: Number(newTransfer.from_base_id),
        to_baseid: Number(newTransfer.to_base_id),
        asset_id: Number(newTransfer.asset_id),
        date: newTransfer.date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormMsg('Transfer recorded successfully!');
      setNewTransfer({ from_base_id: '', to_base_id: '', asset_id: '', date: '' });
      fetchTransfers();
    } catch (err) {
      console.error('Error creating transfer:', err);
      setFormMsg('Failed to record transfer.');
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white w-full h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Transfers</h1>

        {/* Create Transfer Form */}
        <h2 className="text-xl font-bold mt-4 mb-4">Record New Transfer</h2>
        <div className="bg-[rgba(204,213,205,0.84)] p-4 rounded-lg flex flex-col gap-4 max-w-xl">
          <input
            type="number"
            placeholder="From Base ID"
            value={newTransfer.from_base_id}
            onChange={(e) => setNewTransfer({ ...newTransfer, from_base_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <input
            type="number"
            placeholder="To Base ID"
            value={newTransfer.to_base_id}
            onChange={(e) => setNewTransfer({ ...newTransfer, to_base_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <input
            type="number"
            placeholder="Asset ID"
            value={newTransfer.asset_id}
            onChange={(e) => setNewTransfer({ ...newTransfer, asset_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <input
            type="date"
            value={newTransfer.date}
            onChange={(e) => setNewTransfer({ ...newTransfer, date: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
          <button
            onClick={handleCreateTransfer}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Add Transfer
          </button>
          {formMsg && <p className="text-sm text-green-400">{formMsg}</p>}
        </div>

        {/* Transfer Table */}
        <h2 className="text-xl font-bold mt-10 mb-4">Transfer History</h2>
        <table className="w-full table-auto bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
          <thead className="bg-green-900">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">From Base</th>
              <th className="px-4 py-2">To Base</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t, index) => (
              <tr key={index} className="text-center border-t border-green-700">
                <td className="px-4 py-2">{new Date(t.transfer_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{t.asset}</td>
                <td className="px-4 py-2">{t.from_base}</td>
                <td className="px-4 py-2">{t.to_base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
