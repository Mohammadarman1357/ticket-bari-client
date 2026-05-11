import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrainSubway, FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaBus, FaCheckCircle } from 'react-icons/fa';
import { IoTimeSharp } from 'react-icons/io5';
import Countdown from 'react-countdown';

const MyBookedTickets = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['myBookings', user?.email],   // email er personwise data dekabe
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    // delete bookings
    const handleBookingDelete = id => {
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
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {

                            // refresh the data in the ui
                            refetch();  // delete korar sate sate data refresh kore pelbe

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking request has been deleted.",
                                icon: "success"
                            })
                        }
                    })

            };
        });
    }

    const handlePayment = async (booking) => {
        // booking info
        const bookingInfo = {
            totalCost: booking.totalCost,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            userName: booking.userName,
            trackingId: booking.trackingId
        }

        const res = await axiosSecure.post('/payment-checkout-session', bookingInfo);

        // console.log(res.data.url);
        // window.location.href = res.data.url; --> use assign to avoid warning from here 
        window.location.assign(res.data.url);
    }

    // time validation 
    const isPast = new Date(bookings.departureTime) < new Date();

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6' >
            <h2 className='text-4xl font-black text-secondary'>My Booked Tickets : {bookings.length}</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    bookings.map((booking) => (
                        <div key={booking._id} className="bg-white text-left rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group border border-transparent hover:border-primary/20">

                            {/* Card Content */}
                            <div className="p-4 flex flex-col flex-grow">

                                {/* Image & Transport Type Badge */}
                                <div className="relative h-52 overflow-hidden rounded-xl mb-2">
                                    <img
                                        src={booking.image}
                                        alt={booking.ticketTitle}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 text-secondary">
                                        {booking.transportType === 'bus' ? <FaBus></FaBus> : <FaTrainSubway></FaTrainSubway>}
                                        <span className="capitalize">{booking.transportType}</span>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <h3 className="text-xl font-bold mb-2">
                                        {booking.ticketTitle}
                                    </h3>
                                    <div className="font-mono font-bold text-gray-700">
                                        {isPast ? <span className="text-red-500 uppercase">Trip Departed</span> : <Countdown date={new Date(booking.departureTime)} />}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase">Price</span>
                                        <span className="text-2xl font-black text-[#249c00]">${booking.pricePerUnit}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold uppercase block">Quantity</span>
                                        <span className={`text-xl font-bold ${booking.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                                            {booking.quantity} Tickets
                                        </span>
                                    </div>
                                </div>

                                {/* date Section */}
                                <div className="mb-6 flex justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase font-extrabold mb-2 tracking-widest">Date and Time</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[11px] font-semibold border border-blue-100">
                                                <IoTimeSharp className="text-blue-500 text-[12px]" /> {new Date(booking.departureTime).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-extrabold mb-2 tracking-widest">Status</p>
                                        <div className="flex flex-wrap gap-2">
                                            {booking.status === 'pending' ?
                                                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[11px] font-semibold border border-blue-100">
                                                    <span>
                                                        {booking.status}
                                                    </span>
                                                </span>
                                                :
                                                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-md text-[11px] font-semibold border border-blue-100">
                                                    <span>
                                                        {booking.status}
                                                    </span>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <div className='flex w-full justify-between'>
                                    {
                                        booking.paymentStatus === 'paid' ?
                                            <span className="flex items-center gap-1.5 bg-blue-50 text-green-700 px-2 py-1 rounded-md font-semibold border border-blue-100">
                                                <FaCheckCircle className="text-green-500" /> Paid
                                            </span>
                                            :
                                            <button
                                                disabled={isPast || booking.status === 'pending' || booking.status === 'rejected' }
                                                onClick={() => handlePayment(booking)}
                                                className={`py-3.5 btn btn-primary hover:shadow-md text-secondary font-bold rounded-[8px] ${isPast || booking.status === 'pending' || 'rejected'} ? 'bg-gray-300 cursor-not-allowed' : 'btn-primary hover:shadow-md' `}>
                                                Pay NOW
                                            </button>
                                    }
                                    <button
                                        onClick={() => handleBookingDelete(booking._id)}
                                        className='btn btn-square hover:bg-red-500'>
                                        <FaTrashCan></FaTrashCan>
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div >
    );
};

export default MyBookedTickets;