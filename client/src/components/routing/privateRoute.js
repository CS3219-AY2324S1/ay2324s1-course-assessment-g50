import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import AlertNotification from '../../services/alert.service';
import { resetStatus } from '../../reducers/userSlice';

/*
Wrapper around protected components
Redirects to login page on if not logged in
*/
const PrivateRoute = ({component: Component}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
    const isTimedOut = useSelector((state) => state.currentUser.status);
    
    if (isLoggedIn) return <Component />;

    if (isTimedOut === "userHasTimeOut") {
        AlertNotification.error("You have timed out please login again").notify(dispatch);
        dispatch(resetStatus());
    }

    return <Navigate to='/login' />;
};

export default PrivateRoute;
