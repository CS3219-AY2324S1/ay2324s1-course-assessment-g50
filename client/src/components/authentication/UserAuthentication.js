import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Register from "./authViewComponents/Register";
import Login from "./authViewComponents/Login";
import "./userAuthentication.css";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { loginAction, registerAction } from '../../reducers/userSlice';


const UserProfileManager = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
  const status = useSelector((state) => state.currentUser.status);

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  /* Returns back to questions */
  const goBack = () => {
    navigate('/');
  }

  /* sends user info to login before retrieving user info */
  const handleLogin = (email, password) => {
    dispatch(loginAction({ email, password }));
  }

  /* register user info */
  const handleRegister = (email, password) => {
    dispatch(registerAction({email, password}));
  }

  return (
    <div className="authentication-page">
      <div className="authentication-container">
        <p className="title">{isLogin ? "LOGIN" : "REGISTER"}</p>
        {isLogin 
        ? <Login handleLogin={handleLogin}/> 
        : <Register handleRegister={handleRegister}/>}
        <p className="register-link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Not a user? Register here!" : "Back to Login"}</p>
      </div>
     
    </div>
    
  )
};

export default UserProfileManager;
