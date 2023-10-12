import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

/*
Wrapper around protected components
Redirects to login page on if not logged in
*/
const PrivateRoute = ({component: Component}) => {
    const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
    if (isLoggedIn) return <Component />;

    return <Navigate to='/login' />;
};

export default PrivateRoute;
