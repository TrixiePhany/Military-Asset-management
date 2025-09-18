import React, { useState } from "react";
import background from "../assets/Heroimage.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HeroSection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        username,
        password
      });

      const { token } = res.data;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('token', token);// chnages here
      localStorage.setItem('role', decoded.role);
      localStorage.setItem('userId', decoded.id);
      localStorage.setItem('baseId', decoded.base_id);

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        MILITARY ASSET MANAGEMENT SYSTEM
      </h1>
      <p className="mt-2 text-lg text-center">
        Enable commanders and logistics personnel to manage the movement, assignment and expenditure of critical assets across multiple bases. 
      </p>

      <div className="bg-[rgba(0,0,0,0.5)] mt-6 p-6 border border-amber-600 rounded-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded text-white border border-amber-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded text-white border border-amber-600"
        />
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 ease-in-out transition-all duration-500  bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
