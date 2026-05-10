import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();

    // data load .set verificationStatus
    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['tickets', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?status=pending`);
            console.log('manage tickets ', res.data)
            return res.data;
        }
    })

    // delivery status update
    const handleVerificationStatusUpdate = (ticket, status) => {

        const statusInfo = {
            status: status
        };

        let message = `Ticket status updated with ${status.split('_').join(' ')}`;

        Swal.fire({
            title: "Are you sure ?",
            text: `You are ${status} the ticket.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/tickets/${ticket._id}/status`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh data
                            refetch();

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: message,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        })
    }


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Manage Tickets : {tickets.length}</h2>

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
                                        <button
                                            onClick={() => { handleVerificationStatusUpdate(ticket, 'approved') }}
                                            className="btn btn-primary text-secondary">Approve</button>
                                        <button
                                            onClick={() => { handleVerificationStatusUpdate(ticket, 'rejected') }}
                                            className="btn btn-warning text-secondary ms-2">Reject</button>
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

export default ManageTickets;