// RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RegisterForm;
