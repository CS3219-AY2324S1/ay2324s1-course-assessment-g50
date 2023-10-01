import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import "./userAuthentication.css";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { loginAction, selectIsLoggedIn, registerAction } from '../../reducers/userSlice';


const UserProfileManager = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  /* Return back to questions */
  const goBack = () => {
    navigate('/');
  }

  /* sends user info to login before retrieving user info */
  const handleLogin = async (email, password) => {
    await dispatch(loginAction({email, password}));
    navigate('/');
  }

  /* register user info */
  const handleRegister = async (email, password) => {
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
          <div className="go-back" onClick={goBack}>
            <BsArrowLeftSquareFill  className="return-icon"/>
          </div>
      </div>
     
    </div>
    
  )
};

export default UserProfileManager;