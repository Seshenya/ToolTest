import useAuth from 'hooks/useAuth';
import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();
    let location = useLocation();
    console.log(auth)

    if (!auth.user_id) {
        return <Navigate to="/authentication/sign-in" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;