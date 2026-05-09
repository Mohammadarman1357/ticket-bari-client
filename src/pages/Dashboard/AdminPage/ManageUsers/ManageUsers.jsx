import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    // data load
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' };

        Swal.fire({
            title: "Are you sure?",
            text: `User role will be changed to ${roleInfo.role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh data
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${user.displayName} marked as an Admin`,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                        console.log(res.data)
                    })
            }
        })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' };
        Swal.fire({
            title: "Are you sure?",
            text: `User role will be changed to ${roleInfo.role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh data
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${user.displayName} removed from Admin`,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        })
    }


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Manage Users : {users.length}</h2>

            {/* search user */}
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search users" />
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle h-12 w-12">
                                                    <img src={user.photoURL} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                <button
                                                    onClick={() => handleRemoveAdmin(user)}
                                                    className='btn bg-red-500'><FiShieldOff></FiShieldOff></button> :
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className='btn bg-primary text-secondary'><FaUserShield></FaUserShield></button>
                                        }
                                    </td>
                                    {/* <td>
                                        <button className="btn btn-ghost btn-xs">Actions</button>
                                    </td> */}
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;