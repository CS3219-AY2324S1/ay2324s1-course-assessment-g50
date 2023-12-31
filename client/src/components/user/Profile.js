import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAction, logoutAction } from "../../reducers/userSlice";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserGear } from "react-icons/fa6";
import { HiOutlineLogout, HiOutlineInformationCircle } from "react-icons/hi";
import { TbHistoryToggle } from "react-icons/tb";
import ProfilePanel from "./profileComponents/ProfilePanel";
import "./profile.css";
import BasicInfo from "./profileViewComponents/BasicInfo";
import AccountInfo from "./profileViewComponents/AccountInfo";
import AttemptHistory from "./profileViewComponents/AttemptHistory";
import ProfileAvatar from "./profileComponents/Avatar";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAccessedFromHistory = location.state ? location.state.isAccessedFromHistory : false;

  /* Current logged in data */
  const user = useSelector((state) => state.currentUser);
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
  const status = useSelector((state) => state.currentUser.status);

  const PANEL = {
    BASIC_INFO: "Basic Info",
    ACCOUNT: "Account",
    LOGOUT: "Logout",
    ATTEMPT_HISTORY: "Attempt History"
  }
  const [panel, setPanel] =  useState(isAccessedFromHistory ? PANEL.ATTEMPT_HISTORY : PANEL.BASIC_INFO);

  /* returns to authentication page on log out
  also used when account is deleted */ 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn])

  /* retrieve user data when profile page is rendered 
  and also whenever there's a change in user state*/
  useEffect(() => {
    //prevent double fetching
    if (isLoggedIn && status !== "sucessfulFetch" ) {
      dispatch(fetchUserDataAction());
    }
  }, [status]);

  const goBack = () => {
    navigate('/');
  }

  const onclickLogout = (panelName) => {
    dispatch(logoutAction());
  }
  
  const onclickPanel = (panelName) => {
    setPanel(panelName);
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="title">Profile</h1>
        
        <div className="side-panel">
          <ProfileAvatar user={user}/>
          <div className="panels">
            <ProfilePanel onclick={onclickPanel} sectionName={PANEL.BASIC_INFO} selected={panel} Icon={<HiOutlineInformationCircle className="icon"/>}/>
            <ProfilePanel onclick={onclickPanel} sectionName={PANEL.ACCOUNT} selected={panel} Icon={<FaUserGear className="icon"/>}/>
            <ProfilePanel onclick={onclickPanel} sectionName={PANEL.ATTEMPT_HISTORY} selected={panel} Icon={<TbHistoryToggle className="icon"/>}/>
            <ProfilePanel onclick={onclickLogout} sectionName={PANEL.LOGOUT} selected={panel} Icon={<HiOutlineLogout className="icon"/>}/>
          </div>
          <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
        </div>
        {panel === PANEL.BASIC_INFO && <BasicInfo user={user}/>}
        {panel === PANEL.ATTEMPT_HISTORY && <AttemptHistory/>}
        {panel === PANEL.ACCOUNT && <AccountInfo user={user}/>}
      </div>
    </div>
    
  );
};

export default Profile;
