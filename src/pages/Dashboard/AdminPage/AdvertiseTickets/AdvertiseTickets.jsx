import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();

    // data load .set verificationStatus
    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['tickets', 'approved'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?status=approved`);
            console.log('manage tickets ', res.data)
            return res.data;
        }
    })

    // delivery status update
    const handleVerificationStatusUpdate = (ticket, advertiseRequested) => {

        if (advertiseRequested === true) {
            const alreadyAdvertised = tickets.filter(t => t.isAdvertised === true).length;

            if (alreadyAdvertised >= 6) {
                return Swal.fire({
                    icon: "error",
                    title: "Limit Reached",
                    text: "You cannot advertise more than 6 tickets!",
                });
            }
        }

        const statusInfo = {
            isAdvertised: advertiseRequested
        };

        Swal.fire({
            title: "Are you sure?",
            text: advertiseRequested ? "You want to advertise this!" : "You want to remove this from ads!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/tickets/${ticket._id}/advertise`, statusInfo)
                    .then(res => {
                        // refresh data
                        refetch();

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: advertiseRequested ? "You are successfully Advertise tickets!" : "You are successfully Unadvertise the tickets!",
                            showConfirmButton: false,
                            timer: 2000
                        })
                    })
            }
        })
    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Advertise Tickets : {tickets.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Ticket Title</th>
                            <th>Price Per Ticket</th>
                            <th>Verification Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets.map((ticket, i) =>
                                <tr key={ticket._id}>
                                    <th>{i + 1}</th>
                                    <td>{ticket.ticketTitle}</td>
                                    <td>{ticket.pricePerUnit}</td>
                                    <td>{ticket.status}</td>
                                    <td>
                                        {
                                            !ticket.isAdvertised ? (
                                                <button
                                                    onClick={() => { handleVerificationStatusUpdate(ticket, true) }}
                                                    className="btn btn-primary text-secondary">Advertise</button>
                                            )
                                                :
                                                (
                                                    <button
                                                        onClick={() => { handleVerificationStatusUpdate(ticket, false) }}
                                                        className="btn btn-warning text-secondary ms-2">Unadvertise</button>
                                                )
                                        }
                                    </td>


                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};


export default AdvertiseTickets;