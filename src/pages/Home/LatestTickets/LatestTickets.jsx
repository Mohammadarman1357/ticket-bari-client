import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBus, FaCheckCircle } from 'react-icons/fa';
import { FaTrainSubway } from 'react-icons/fa6';

const LatestTickets = () => {

    const axiosInstance = useAxios();

    // data load isAdvertise = true
    const { data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'approved'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/latest-tickets?status=approved`);
            return res.data;
        }
    })

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl mb-5' >
            <h2 className='text-5xl font-black text-secondary'>Latest Tickets</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tickets.map((ticket) => (
                        <div key={ticket._id} className="bg-white text-left rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group border border-transparent hover:border-primary/20">

                            {/* Card Content */}
                            <div className="p-4 flex flex-col flex-grow">

                                {/* Image & Transport Type Badge */}
                                <div className="relative h-52 overflow-hidden rounded-xl mb-2">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.ticketTitle}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 text-secondary">
                                        {ticket.transportType === 'bus' ? <FaBus></FaBus> : <FaTrainSubway></FaTrainSubway>}
                                        <span className="capitalize">{ticket.transportType}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2">
                                    {ticket.ticketTitle}
                                </h3>

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase">Price</span>
                                        <span className="text-2xl font-black text-[#249c00]">${ticket.pricePerUnit}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold uppercase block">Available</span>
                                        <span className={`text-xl font-bold ${ticket.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                                            {ticket.quantity} Tickets
                                        </span>
                                    </div>
                                </div>

                                {/* Perks Section */}
                                <div className="mb-6 flex-grow">
                                    <p className="text-[10px] uppercase font-extrabold mb-2 tracking-widest">Perks & Facilities</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[11px] font-semibold border border-blue-100">
                                            <FaCheckCircle className="text-blue-500" /> {ticket.perks === 'nonAC' ? "Non AC" : "AC"}
                                        </span>
                                    </div>
                                </div>

                                {/* See Details Button */}
                                <Link to={`/ticket-details/${ticket._id}`} className="mt-auto">
                                    <button className="w-full py-3.5 btn text-secondary font-bold rounded-[8px] bg-gradient-to-r from-[#05f609] to-[#249c00] hover:shadow-md">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default LatestTickets;