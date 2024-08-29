import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, userLoggedIn, UserLoggedIn }) => {
    const checkUser = localStorage.getItem('logined');
    if (checkUser) {
        UserLoggedIn(true)
        return children || <Outlet />;
    } else {
        if (!userLoggedIn) {
            console.log(userLoggedIn, 'Please Login')
            return <Navigate to='/login' />
        } else {
            return children || <Outlet />;
        }
    }

}

export default PrivateRoute
