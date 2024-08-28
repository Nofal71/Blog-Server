import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const data = JSON.parse(localStorage.getItem('userData'))

    if (!data) {
        return <Navigate to='/login' />
    } else {
        return children || <Outlet />;
    }

}

export default PrivateRoute
