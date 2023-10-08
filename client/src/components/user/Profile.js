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
import ProfileAvatar from "./userProfile/profileComponents/profileAvatar"

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Current logged in data */
  const user = useSelector((state) => state.currentUser);
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
  const status = useSelector((state) => state.currentUser.status);

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

  /* retrieve user data when profile page is rendered 
  and also whenever there's a change in user state*/
  useEffect(() => {
    //prevent double fetching
    if (isLoggedIn && status !== "sucessfulFetch" ) {
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

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="title">Profile</h1>
        
        <div className="side-panel">
          <ProfileAvatar user={user}/>
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
