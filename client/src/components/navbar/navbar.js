import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserAvatar from "../user/userProfile/userAvatar.js";
import "./navbar.css";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
    const userRole = useSelector((state) => state.currentUser.userRole)
    const isAdmin = userRole === 'admin';

    const adminLinks = (
        <ul className='navbar_ul'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/add-questions'>Add Questions</Link></li>
        </ul>
    );
    const userLinks = (
        <ul className='navbar_ul'>
            <li><Link to='/'>Home</Link></li>
        </ul>
    );
    
    return (
        <nav className='navbar'>
            <div className='left'>
                <h1><i className='fas fa-code'></i> Peerprep</h1>
                {isLoggedIn && <>{isAdmin ? adminLinks : userLinks}</>}
            </div>
            <UserAvatar />
        </nav>
    );
};

export default Navbar;
