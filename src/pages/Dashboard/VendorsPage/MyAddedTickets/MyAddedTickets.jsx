import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyAddedTickets = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['myTickets', user?.email],   // email er person wise data dekabe
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user.email}`);
            return res.data;
        }
    });

    


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>My Added Tickets : {tickets.length}</h2>

        </div>
    );
};

export default MyAddedTickets;