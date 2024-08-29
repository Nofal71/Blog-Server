import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, userLoggedIn }) => {
    if (!userLoggedIn) {
        console.log(userLoggedIn, 'Please Login')
        return <Navigate to='/login' />
    } else {
        return children || <Outlet />;
    }

}

export default PrivateRoute
