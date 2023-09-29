import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import Deregister from './Deregister';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';  // Import useNavigate


const UserProfileManager = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const authorizedAxios = useMemo(() => {
    return axios.create({
      headers: {
        'token': `${token}`
      }
    });
  }, [token]);  // Re-create authorizedAxios whenever token changes

  
  const fetchUserData = async () => {
    try {
      const url = `http://localhost:8000/users`;
      const response = await authorizedAxios.get(url);
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleRegister = async (email, password) => {
    try {
      await axios.post('http://localhost:8000/users', { email, password });
      // Assuming registration does not automatically log the user in
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {  // Only call fetchUserData if token is non-null
      fetchUserData();
    }
  }, [token, fetchUserData]); 

  const handleLogin = async (JWTToken) => {
    try {
      console.log(JWTToken); // It is not null
      setToken(JWTToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUserInfo = async (updateData) => {
    try {
      const response = await authorizedAxios.patch(`http://localhost:8000/users/info`, updateData);
      console.log(response.data);
      fetchUserData();
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleUpdateUser = async (email) => {
    try {
      await authorizedAxios.patch('http://localhost:8000/users/', { email });
      fetchUserData(currentUser.id);  // Assume the id field exists on the currentUser object
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeregister = async () => {
    try {
      await authorizedAxios.delete('http://localhost:8000/users/');
      setCurrentUser(null);
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to="/">Go to Questions</Link>
      {!currentUser ? (
        <Routes>
          <Route path="/" element={<div><Login onLogin={handleLogin} /><Link to="../register">Don't have an account? Register</Link></div>} />
          <Route path="register" element={<div><Register onRegister={handleRegister} /><Link to="/">Already have an account? Login</Link></div>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={
            <div>
              <Profile user={currentUser} />
              <Link to="update-profile">Update Profile</Link>
              <Deregister onDeregister={handleDeregister} />
            </div>
          } />
          <Route path="update-profile" element={<div><UpdateProfile user={currentUser} onUpdate={handleUpdateUserInfo}/><Link to="/">Back to Profile</Link></div>} />
        </Routes>
      )}
    </div>
  );
};


export default UserProfileManager;
