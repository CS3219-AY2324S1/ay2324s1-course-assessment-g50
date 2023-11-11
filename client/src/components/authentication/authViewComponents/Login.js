import React, { useState, useEffect } from 'react';
import "./login.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
  const status = useSelector((state) => state.currentUser.status);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFailedAuthentication, setIsFailedAuthentication] = useState(false);

  /* Goes to question page on sucessful login */ 
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn])
  
  /* If failed login */
  useEffect(() => {
    if (status === "failedLogin") {
      setIsFailedAuthentication(true);
    }
  }, [status]);

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
