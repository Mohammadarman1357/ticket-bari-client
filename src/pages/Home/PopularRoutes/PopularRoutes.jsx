import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const PopularRoutes = () => {

    const axiosInstance = useAxios();

    // data load isAdvertise = true
    const { data: routes = [] } = useQuery({
        queryKey: ['tickets', 'approved'],
        queryFn: async () => {
            const res = await axiosInstance.get('/tickets');
            return res.data;
        }
    })

    return (

        <div className="px-4">
            <div className="flex justify-between items-end mb-10">
                <div className="text-left">
                    <h2 className="text-4xl font-extrabold text-secondary">Popular Routes</h2>
                    <p className="mt-2">Explore the most traveled destinations by our passengers.</p>
                </div>
                <Link to={'/all-tickets'}>
                    <button className="hidden md:block btn btn-outline btn-primary rounded-full px-8">View All Routes</button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {routes.map((route) => (
                    <Link to={`/ticket-details/${route._id}`} key={route._id} className="relative group cursor-pointer overflow-hidden rounded-4xl shadow-lg">
                        <div className="h-64 overflow-hidden">
                            <img
                                src={route.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={route.ticketTitle}
                            />
                        </div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-xs font-medium uppercase tracking-widest text-green-400 mb-1">{route.districtFrom} to</p>
                            <h3 className="text-2xl font-bold">{route.districtTo}</h3>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-sm font-light">Starting from</span>
                                <span className="text-xl font-black text-white">${route.pricePerUnit}</span>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 text-white text-xs font-bold">
                            4.9 ★
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default PopularRoutes;