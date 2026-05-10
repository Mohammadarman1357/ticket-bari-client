import React from 'react';
import { BiEdit } from 'react-icons/bi';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminProfiles from '../AdminPage/AdminProfiles/AdminProfiles';
import VendorProfiles from '../VendorsPage/VendorProfiles/VendorProfiles';
import UserProfiles from '../UserProfiles/UserProfiles';
import Forbidden from '../../../components/Forbidden/Forbidden';

const Profiles = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminProfiles></AdminProfiles>
    }
    else if (role === 'vendor') {
        return <VendorProfiles></VendorProfiles>
    }
    else if (role === 'user') {
        return <UserProfiles></UserProfiles>
    }
    else {
        return <Forbidden></Forbidden>
    };
};

export default Profiles;