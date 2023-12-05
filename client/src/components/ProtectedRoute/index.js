import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    let location = useLocation();

    if (!user?.user_id) {
        return <Navigate to="/authentication/sign-up" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;