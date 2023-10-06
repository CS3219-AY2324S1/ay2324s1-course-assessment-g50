import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAction, logoutAction } from "../../reducers/userSlice";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { FaUserGear } from "react-icons/fa6";
import { HiOutlineLogout, HiOutlineInformationCircle } from "react-icons/hi";
import ProfilePanel from "./userProfile/profileComponents/ProfilePanel";
import "./profile.css";
import BasicInfo from "./userProfile/profileComponents/BasicInfo";
import AccountInfo from "./userProfile/profileComponents/AccountInfo";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Current logged in data */
  const user = useSelector((state) => state.currentUser);
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);

  const PANEL = {
    BASIC_INFO: "Basic Info",
    ACCOUNT: "Account",
    LOGOUT: "Logout"
  }
  const [panel, setPanel] = useState(PANEL.BASIC_INFO)

  /* returns to authentication page on log out
  also used when account is deleted */ 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn])

  /* retrieve user data whenever profile page is rendered */
  useEffect(() => {
    console.log("this one is running");
    if (isLoggedIn) {
      dispatch(fetchUserDataAction());
    }
  }, [user]);

  const goBack = () => {
    navigate('/');
  }

  const onclickLogout = (panelName) => {
    dispatch(logoutAction());
  }
  
  const onclickPanel = (panelName) => {
    setPanel(panelName);
  }

  // TODO: set dynamic background link
  const avatarStyle = {
    backgroundImage: `url(${user.avatar})` ,
    backgroundPosition: "center",
    backgroundSize: "contain",
    height: "200px",
    width: "200px",
    borderRadius: "100px",
    position: "absolute",
    top: "30px",
    marginBottom: "50px",
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="title">Profile</h1>
        
        <div className="side-panel">
          <div className="avatar" style={avatarStyle}></div>
          <div className="panels">
            <ProfilePanel onclick={onclickPanel} sectionName={PANEL.BASIC_INFO} selected={panel} Icon={<HiOutlineInformationCircle className="icon"/>}/>
            <ProfilePanel onclick={onclickPanel} sectionName={PANEL.ACCOUNT} selected={panel} Icon={<FaUserGear className="icon"/>}/>
            <ProfilePanel onclick={onclickLogout} sectionName={PANEL.LOGOUT} selected={panel} Icon={<HiOutlineLogout className="icon"/>}/>
          </div>
          <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
        </div>
        {panel === PANEL.BASIC_INFO && <BasicInfo user={user}/>}
        {panel === PANEL.ACCOUNT && <AccountInfo user={user}/>}
      </div>
    </div>
    
  );
};

export default Profile;
