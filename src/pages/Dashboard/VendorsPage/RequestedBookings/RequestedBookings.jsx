import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const RequestedBookings = () => {

    const axiosSecure = useAxiosSecure();

    // data load by tanstack
    const { refetch, data: bookings = [] } = useQuery({
        queryKey: ['bookings', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    })

    const updateBookingStatus = (booking, status) => {

        const updateInfo = { status: status }

        axiosSecure.patch(`/bookings/${booking._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Booking status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })

    }

    const handleApproval = booking => {
        updateBookingStatus(booking, 'approved');
    }

    const handleRejection = booking => {
        updateBookingStatus(booking, 'rejected');
    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Requested Bookings : {bookings.length}</h2>

            < div className="overflow-x-auto" >
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Ticket Title</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{booking.ticketTitle}</td>
                                    <td>{booking.quantity}</td>
                                    <td>{booking.totalCost}</td>
                                    <td className={`${booking.status === 'approved' ? ' text-green-500 ' : 'text-rose-500'}`}
                                    >{booking.status}</td>
                                    <td>
                                        {
                                            booking.status === 'paid' ?
                                                <span>
                                                    <button
                                                        disabled
                                                        onClick={() => handleApproval(booking)}
                                                        className='btn text-secondary'>
                                                        Accept
                                                    </button>
                                                    <button
                                                        disabled
                                                        onClick={() => handleRejection(booking)}
                                                        className='btn btn-warning text-secondary mx-2'>
                                                        Reject
                                                    </button>
                                                </span>
                                                :
                                                <span>
                                                    <button
                                                        onClick={() => handleApproval(booking)}
                                                        className='btn btn-primary text-secondary'>
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejection(booking)}
                                                        className='btn btn-warning text-secondary mx-2'>
                                                        Reject
                                                    </button>
                                                </span>
                                        }

                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div >

        </div>
    );
};

export default RequestedBookings;