import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, userLoggedIn, UserLoggedIn }) => {
    // if userLogged is true navigate to main
    const user = localStorage.getItem('email') ? localStorage.getItem('email') : false;
    if (user) {
        UserLoggedIn(true)
        return children || <Outlet />;
    }
    if (!userLoggedIn) {
        console.log(userLoggedIn, 'Please Login')
        return <Navigate to='/login' />
    } else {
        return children || <Outlet />;
    }
}

export default PrivateRoute
