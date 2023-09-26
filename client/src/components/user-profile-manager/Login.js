// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import RSAUtil from './RSAUtil';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedPassword = RSAUtil.encrypt(password);
    try {
      const response = await axios.post('http://localhost:8000/users/login', { email, password: encryptedPassword });
      console.log(response.data);  // Handle the response from your server
      if (response.data.code === 200) {
        // successful login
        onLogin(response.data.data);  
      }
    } catch (error) {
      console.error(error);  // Handle error
    }
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
