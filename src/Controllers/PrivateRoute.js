import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { pipGetToken } from './Pip';
import { pageRoutes } from '../Routes/pageRoutes';

const PrivateRoute = ({ children }) => {
    const isAuth = pipGetToken();
    console.log({ isAuth })
    return (
        isAuth ? children : <Navigate to={pageRoutes.login} />
    )
}

export default PrivateRoute