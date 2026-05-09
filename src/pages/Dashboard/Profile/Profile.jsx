import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    console.log(user)

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>User Profile</h2>
            <h2>{user?.displayName}</h2>
        </div>
    );
};

export default Profile;