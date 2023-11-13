import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

/*
Wrapper around protected components
Redirects to home page on if not logged in
*/
const AdminRoute = ({component: Component}) => {
    const userRole = useSelector((state) => state.currentUser.userRole)
    const isAdmin = userRole === 'admin';
    if (isAdmin) return <Component />;

    return <Navigate to='/login' />;
};

export default AdminRoute;
