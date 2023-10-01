import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAction } from "../../reducers/userSlice";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Current logged in data */
  const user = useSelector((state) => state.currentUser);

  const goBack = () => {
    navigate('/');
  }

  useEffect(() => {
    dispatch(fetchUserDataAction());
  }, [user])

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Nickname: {user.nickname}</p>
      <p>Avatar: {user.avatar}</p>
      <p>Gender: {user.gender}</p>
      <p>Birth: {user.birth}</p>
      <p>Sign: {user.sign}</p>
      <div className="go-back" onClick={goBack}>
        <BsArrowLeftSquareFill  className="return-icon"/>
      </div>
    </div>
  );
};

export default Profile;
