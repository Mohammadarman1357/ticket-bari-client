import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import VendorDashboardHome from './VendorDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import Forbidden from '../../../components/Forbidden/Forbidden';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'vendor') {
        return <VendorDashboardHome></VendorDashboardHome>
    }
    else if (role === 'fraud') {
        return <Forbidden></Forbidden>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;