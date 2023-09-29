import React, { useState } from 'react';
import axios from 'axios';
import RSAUtil from './RSAUtil';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedPassword = RSAUtil.encrypt(password);
    try {
      const response = await axios.post('http://localhost:8000/users', { email, password: encryptedPassword });
      console.log(response.data);  // Handle the response from your server
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
