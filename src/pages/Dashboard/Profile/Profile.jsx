// import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../hooks/useAuth';
import { BiEdit } from 'react-icons/bi';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    // const [searchText, setSearchText] = useState('');

    // data load
    const { data: users = [] } = useQuery({
        // queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/role/user`);
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Users Informaions : {users?.length}</h2>



        </div>
    );
};

export default Profile;