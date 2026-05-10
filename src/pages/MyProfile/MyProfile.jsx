import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BiEdit } from 'react-icons/bi';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // data load by email wise
    const { data: person = [] } = useQuery({
        queryKey: ['myProfile', user?.email],   // email er personwise data dekabe
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/myProfile`);
            return res.data;
        }
    });

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>My Profile</h2>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='col-span-1 bg-secondary rounded-2xl flex flex-col items-center p-5'>
                    <img className='w-[100px] h-[100px] border border-primary border-3 rounded-full' src={person?.photoURL} alt="image" />
                    <h2 className='font-semibold text-xl text-primary'>{person?.displayName}</h2>
                    <h3 className='font-medium text-primary'>{user?.email}</h3>
                </div>

                <div className='col-span-1 md:col-span-3 bg-secondary rounded-2xl flex flex-col items-center p-5'>
                    <div className='font-bold text-xl text-primary flex items-center w-full justify-between'>
                        <h2>My Profile</h2>
                        <span  ><BiEdit></BiEdit></span>
                    </div>
                    <hr className='border border-primary border-dashed mt-2 w-full' />
                    <div className='flex w-full mt-2'>
                        <span className='flex-1'>
                            <span>
                                <h2 className='text-[#ddff98dd] text-[16px] font-medium'>Full Name :</h2>
                                <h2 className='text-xl font-semibold text-primary'>{person?.displayName}</h2>
                            </span>
                            <span>
                                <h2 className='text-[#ddff98dd] text-[16px] font-medium'>Role :</h2>
                                <h2 className='text-xl font-semibold text-primary'>{person?.role}</h2>
                            </span>

                        </span>
                        <span className='flex-1'>
                            <span>
                                <h2 className='text-[#ddff98dd] text-[16px] font-medium'>Email :</h2>
                                <h2 className='text-xl font-semibold text-primary'>{person?.email}</h2>
                            </span>
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default MyProfile;