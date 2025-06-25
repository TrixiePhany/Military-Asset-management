import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Assignments() {
  const [tab, setTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({
    asset_id: '',
    personnel_id: '',
    quantity: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const resAssign = await axios.get('http://localhost:3000/api/assignments', { headers });
      const resExpend = await axios.get('http://localhost:3000/api/expenditures', { headers });

      setAssignments(resAssign.data);
      setExpenditures(resExpend.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (tab === 'assignments') {
        const params = new URLSearchParams();

        for (const key in form) {
          const value = form[key];

          // Skip null, undefined, empty string, or NaN
          if (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !(typeof value === 'number' && isNaN(value))
          ) {
            params.append(key, value);
          }
        }

        let res = await axios.get(`http://localhost:3000/api/assignments/filters?${params.toString()}`, { headers });
        setAssignments(res.data);
      }
      else {
        const params = new URLSearchParams();

        for (const key in form) {
          const value = form[key];

          // Skip null, undefined, empty string, or NaN
          if (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !(typeof value === 'number' && isNaN(value))
          ) {
            params.append(key, value);
          }
        }

        let res = await axios.get(`http://localhost:3000/api/expenditures/filters?${params.toString()}`,
          { headers });
        setExpenditures(res.data);
      }

      setForm({ asset_id: '', personnel_id: '', quantity: '', date: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setMessage('Submission failed.');
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
          onClick={() => { setTab('assignments'); setMessage(''); }}
          className={`px-4 py-2 rounded ${tab === 'assignments' ? 'bg-green-700' : 'bg-green-900'}`}
        >
          Assignments
        </button>
        <button
          onClick={() => { setTab('expenditures'); setMessage(''); }}
          className={`px-4 py-2 rounded ${tab === 'expenditures' ? 'bg-green-700' : 'bg-green-900'}`}
        >
          Expenditures
        </button>
      </div>

      {/* Form */}
      <div className="bg-[rgba(0,0,0,0.4)] p-4 rounded mb-8 flex flex-col gap-4 max-w-xl">
        <input
          type="number"
          placeholder="Asset ID"
          value={form.asset_id}
          onChange={(e) => setForm({ ...form, asset_id: e.target.value })}
          className="px-3 py-2 text-black rounded"
        />
        {tab === 'assignments' && (
          <input
            type="number"
            placeholder="Personnel ID"
            value={form.personnel_id}
            onChange={(e) => setForm({ ...form, personnel_id: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
        )}
        {tab === 'expenditures' && (
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="px-3 py-2 text-black rounded"
          />
        )}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="px-3 py-2 text-black rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Filter {tab === 'assignments' ? 'Assignment' : 'Expenditure'}
        </button>
        {message && <p className="text-green-300">{message}</p>}
      </div>

      {/* Table */}
      {tab === 'assignments' && (
        <table className="w-full table-auto bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
          <thead className="bg-green-900">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Personnel</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={row.id} className="text-center border-t border-green-700">
                <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{row.asset}</td>
                <td className="px-4 py-2">{row.personnel}</td>
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
                <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{row.asset}</td>
                <td className="px-4 py-2">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
