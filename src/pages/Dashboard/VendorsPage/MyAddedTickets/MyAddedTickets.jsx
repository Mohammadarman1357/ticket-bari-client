import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { GoArrowSwitch } from 'react-icons/go';
import Swal from 'sweetalert2';

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

    // ticket delete
    const handleDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // template string
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {

                            // refresh the data in the ui
                            refetch();  // delete korar sate sate data refresh kore pelbe

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ticket request has been deleted.",
                                icon: "success"
                            })
                        }
                    })

            };
        });
    }


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>My Added Tickets : {tickets.length}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    tickets.map(ticket => (
                        <div key={ticket._id} className="card card-body space-y-2 bg-base-100 shadow-xl hover:shadow-2xl border border-gray-200">
                            {/* image */}
                            <figure className="h-48 rounded-[8px]">
                                <img src={ticket.image} alt="ticket" className="w-full h-full object-cover" />
                            </figure>
                            {/* card title, destination, price */}
                            <div className='space-y-1'>
                                <h2 className="card-title text-lg">{ticket.ticketTitle}</h2>
                                <div className="flex items-center gap-2"><span>From : </span><span className='font-bold'>{ticket.regionFrom}</span> <span>
                                    <GoArrowSwitch /></span> <span>To : </span><span className='font-bold'>{ticket.regionTo}</span></div>

                                <p className="font-bold text-lg">Price: ${ticket.pricePerUnit}</p>

                                {/* Status Badge */}
                                <div className={`badge font-semibold rounded-2xl p-3 ${ticket.status === 'pending' ? 'badge-warning' :
                                    ticket.status === 'approved' ? 'badge-success' : 'badge-error'
                                    }`}>
                                    {ticket.status}
                                </div>

                                <div className="card-actions justify-between mt-4">
                                    <Link to={`/dashboard/update-ticket/${ticket._id}`}>
                                        <button
                                            disabled={ticket.status === 'rejected'}
                                            className="btn btn-sm btn-outline btn-info">Update</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(ticket._id)}
                                        disabled={ticket.status === 'rejected'}
                                        className="btn btn-sm btn-outline btn-error">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyAddedTickets;