import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminProfiles = () => {

    const axiosSecure = useAxiosSecure();

    const { data: admins = [] } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/admins');
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6' >
            <h2 className='text-4xl font-black text-secondary'>Admin Profiles : {admins.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((admin, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle h-12 w-12">
                                                    <img src={admin.photoURL} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{admin.displayName}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{admin.email}</td>
                                    <td>{admin.role}</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default AdminProfiles;