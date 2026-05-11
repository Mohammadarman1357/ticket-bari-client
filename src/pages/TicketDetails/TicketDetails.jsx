import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import Countdown from 'react-countdown';

const TicketDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { user } = useAuth();
    const [bookingQty, setBookingQty] = useState(1);

    const { data: ticket = [], refetch } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/single/${id}`);
            return res.data;
        }
    });

    const { ticketTitle, image, pricePerUnit, quantity, departureTime, transportType, perks, vendorName, districtFrom, districtTo } = ticket;

    // time validation 
    const isPast = new Date(departureTime) < new Date();
    const isOutOfStock = quantity === 0;

    const handleBooking = async (e) => {
        e.preventDefault();

        if (parseInt(bookingQty) > quantity) {

            return Swal.fire({
                icon: "error",
                title: "Correct your booking quantity",
                text: "Booking quantity can't be greater than available tickets!",
            });
        }

        const bookingInfo = {
            ticketId: id,
            transportType: transportType,
            districtFrom: districtFrom,
            districtTo: districtTo,
            perks: perks,
            image: image,
            ticketTitle,
            pricePerUnit,
            quantity: parseInt(bookingQty),
            totalCost: pricePerUnit * bookingQty,
            userEmail: user?.email,
            userName: user?.displayName,
            status: 'pending',
            bookingDate: new Date(),
            departureTime
        };

        // close modal
        document.getElementById('booking-modal').close();

        Swal.fire({
            title: "Confirm Your Booking?",
            text: `Total Cost: $${bookingInfo.totalCost}. Do you want to proceed?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#249c00",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Book Now!",
            cancelButtonText: "No, Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // confirmed. save the bookings info to the database
                axiosSecure.post('/bookings', bookingInfo)
                    .then(res => {

                        console.log('after saving bookings', res.data);

                        if (res.data.insertedId) {

                            refetch();

                            Swal.fire({
                                title: "Booked!",
                                text: "Your booking is saved with 'Pending' status.",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });

                            navigate('/dashboard/my-booked-tickets');

                        }
                    })
            };
        });
    };


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6' >

            <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-2xl rounded-3xl overflow-hidden border border-green-50">
                {/* Image Section */}
                <div className="lg:w-1/2 relative">
                    <img src={image} alt="" className="w-full h-full object-cover min-h-[400px]" />
                    <div className="absolute top-6 left-6 badge badge-lg badge-secondary p-4 uppercase font-bold tracking-widest">
                        {transportType}
                    </div>
                </div>

                {/* Details Section */}
                <div className="lg:w-1/2 p-8 space-y-6">
                    <h2 className="text-4xl font-black text-gray-800">{ticketTitle}</h2>
                    <p className="font-medium">Route : <span className="text-blue-700 font-bold">{districtFrom} to {districtTo}</span></p>

                    {/* Countdown Timer */}
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                        <p className="text-xs uppercase font-bold text-green-600 mb-2">Departure In:</p>
                        <div className="text-3xl font-mono font-bold text-gray-700">
                            {isPast ? <span className="text-red-500 uppercase">Trip Departed</span> : <Countdown date={new Date(departureTime)} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold">Price</p>
                            <p className="text-2xl font-black text-green-600">${pricePerUnit}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold">Available</p>
                            <p className={`text-2xl font-black ${isOutOfStock ? 'text-red-500' : 'text-gray-700'}`}>{quantity} Seats</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700">Perks : <span className="font-normal text-gray-500"><span className='badge badge-info rounded-full font-bold'>{perks === 'nonAC' ? "Non AC" : "AC"}</span></span></p>
                        <p className="font-bold text-gray-700">Vendor : <span className="font-normal text-gray-500">{vendorName}</span></p>
                    </div>

                    {/* Book Now Button */}
                    <button
                        disabled={isPast || isOutOfStock}
                        onClick={() => document.getElementById('booking-modal').showModal()}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all 
                        ${isPast || isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-700 hover:shadow-xl hover:scale-[1.02]'}`}
                    >
                        {isOutOfStock ? "Out of Stock" : isPast ? "Booking Closed" : "Book Now"}
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            <dialog id="booking-modal" className="modal">
                <div className="modal-box rounded-3xl">
                    <h3 className="font-black text-2xl mb-4">Book Your Ticket</h3>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold mb-4">Number of Tickets (Max : {quantity})</label>
                            <input
                                type="number"
                                min="1"
                                max={quantity}
                                value={bookingQty}
                                onChange={(e) => setBookingQty(e.target.value)}
                                className="input input-bordered rounded-xl border-green-200 "
                                required
                            />
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl flex justify-between items-center">
                            <span className="font-bold">Total Cost:</span>
                            <span className="text-2xl font-black text-green-600">${pricePerUnit * bookingQty}</span>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary rounded-xl px-8">Confirm Booking</button>
                            <button type="button" onClick={() => document.getElementById('booking-modal').close()} className="btn rounded-xl">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>


    );
};

export default TicketDetails;