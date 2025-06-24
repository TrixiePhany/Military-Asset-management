
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Assignments() {
  const [tab, setTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  const token = localStorage.getItem('token');
  const baseId = localStorage.getItem('baseId');

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const resAssign = await axios.get(`http://localhost:3000/api/assignments?base_id=${baseId}`, { headers });
      const resExpend = await axios.get(`http://localhost:3000/api/expenditures?base_id=${baseId}`, { headers });
      setAssignments(resAssign.data);
      setExpenditures(resExpend.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Assignments & Expenditures</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab('assignments')}
          className={`px-4 py-2 rounded ${tab === 'assignments' ? 'bg-green-700' : 'bg-green-900'}`}
        >
          Assignments
        </button>
        <button
          onClick={() => setTab('expenditures')}
          className={`px-4 py-2 rounded ${tab === 'expenditures' ? 'bg-green-700' : 'bg-green-900'}`}
        >
          Expenditures
        </button>
      </div>

      {/* Table */}
      {tab === 'assignments' && (
        <table className="w-full table-auto bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
          <thead className="bg-green-900">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Personnel</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={row.id} className="text-center border-t border-green-700">
                <td className="px-4 py-2">{new Date(row.assignment_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{row.asset_name}</td>
                <td className="px-4 py-2">{row.personnel_name}</td>
                <td className="px-4 py-2">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'expenditures' && (
        <table className="w-full table-auto bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
          <thead className="bg-green-900">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((row) => (
              <tr key={row.id} className="text-center border-t border-green-700">
                <td className="px-4 py-2">{new Date(row.expenditure_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{row.asset_name}</td>
                <td className="px-4 py-2">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
