import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAction, logoutAction } from "../../reducers/userSlice";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Current logged in data */
  const user = useSelector((state) => state.currentUser);

  /* retrieve user data whenever profile page is rendered*/
  useEffect(() => {
    dispatch(fetchUserDataAction());
  }, []);

  const goBack = () => {
    navigate('/');
  }

  const logout = () => {
    dispatch(logoutAction());
    // window.location.reload();
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Nickname: {user.nickname}</p>
      <p>Avatar: {user.avatar}</p>
      <p>Gender: {user.gender}</p>
      <p>Birth: {user.birth}</p>
      <p>Sign: {user.sign}</p>



      <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
      <div className="logout-button" onClick={() => logout()}>Log out</div>

    </div>
  );
};

export default Profile;
