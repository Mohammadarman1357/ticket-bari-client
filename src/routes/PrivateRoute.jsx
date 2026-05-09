import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {  // loading
        return <Loading></Loading>;
    }

    if (!user) {    // user not exist
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;    // if user is exist go to destination 
};

export default PrivateRoute;