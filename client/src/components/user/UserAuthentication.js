import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import "./userAuthentication.css";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { loginAction, selectIsLoggedIn, registerAction } from '../../reducers/userSlice';


const UserProfileManager = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
  const status = useSelector((state) => state.currentUser.status);

  const [isLogin, setIsLogin] = useState(true);
  const [isFailedAuthentication, setIsFailedAuthentication] = useState(false);
  const navigate = useNavigate();

  /* Return back to questions */
  const goBack = () => {
    navigate('/');
  }

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


  /* sends user info to login before retrieving user info */
  const handleLogin = async (email, password) => {
    await dispatch(loginAction({email, password}));
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
        ? <Login handleLogin={handleLogin} isFailedAuthentication={isFailedAuthentication}/> 
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
