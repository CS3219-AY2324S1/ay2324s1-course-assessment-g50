import axios from 'axios';
// src/components/Login.js
import React, { useState } from 'react';
import "./login.css";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="email">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button" onClick={() => handleLogin(email, password)}>Login</div>
    </div>
  );
};

export default Login;
