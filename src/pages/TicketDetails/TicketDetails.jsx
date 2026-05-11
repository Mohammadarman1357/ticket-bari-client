import React from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const TicketDetails = () => {

    const { ticketId } = useParams();
    const axiosInstance = useAxios();
    // const navigate = useNavigate();

    // load data from tickets
    const { data: tickets = [] } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tickets/single/${ticketId}`);
            console.log(res.data)
            return res.data;
        }
    });

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6' >
            <h2 className='text-4xl font-black text-secondary'>{tickets.ticketTitle}</h2>



        </div>
    );
};

export default TicketDetails;