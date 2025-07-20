

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      onLogin(res.data.token);
      // Check for redirect query param
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get('redirect');
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate('/'); // Default to dashboard
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 w-full rounded mb-2"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="text-blue-500 text-sm underline w-full"
          onClick={handleRegisterRedirect}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
