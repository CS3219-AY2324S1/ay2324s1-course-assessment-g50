import React, { useState } from 'react';
import "./login.css";

const Login = ({ handleLogin, isFailedAuthentication }) => {
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
        {isFailedAuthentication && <p className="failed-login">Incorrect login details</p>}
        <div className="button" onClick={() => handleLogin(email, password)}>Login</div>
    </div>
  );
};

export default Login;
