import React, { useState } from "react";
import background from "../assets/Heroimage.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HeroSection() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      const { token } = res.data;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      //user info
      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      localStorage.setItem('baseId', decoded.base_id);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        MILITARY ASSET MANAGEMENT SYSTEM
      </h1>
      <p className="text-lg text-center mb-6">
        Enables commanders and logistics personnel to manage movement, assignment, and expenditure of critical assets.
      </p>

      <div className="bg-[rgba(0,0,0,0.5)] p-6 rounded-lg w-full max-w-md">
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
