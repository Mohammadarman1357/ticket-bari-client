import React from 'react';

import bookingImg from '../../../assets/images/booking.png';
import rateImg from '../../../assets/images/rates.png';
import providerImg from '../../../assets/images/provider.png';
import supportImg from '../../../assets/images/support.png';

const WhyChooseUs = () => {
    return (
        <div className='my-10 mx-5'>
            <h1 className='font-bold text-5xl text-center mb-4'>
                Why
                <span className='text-green-800 ml-2'>Choose Us</span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center'>

                <div className='flex gap-2 items-center bg-white shadow-md p-5 rounded-xl hover:bg-primary'>
                    <img className='w-25' src={bookingImg} alt="" />
                    <span className='font-bold text-3xl'>
                        <h1 className='text-green-800'>Easy</h1>
                        <h1>Booking</h1>
                    </span>
                </div>
                <div className='flex gap-2 items-center bg-white shadow-md p-5 rounded-xl hover:bg-primary'>
                    <img className='w-25 lg:w-20' src={rateImg} alt="" />
                    <span className='font-bold text-3xl lg:text-2xl'>
                        <h1 className='text-green-800'>Affordable</h1>
                        <h1>Rates</h1>
                    </span>
                </div>
                <div className='flex gap-2 items-center bg-white shadow-md p-5 rounded-xl hover:bg-primary'>
                    <img className='w-25' src={providerImg} alt="" />
                    <span className='font-bold text-3xl'>
                        <h1 className='text-green-800'>Trusted</h1>
                        <h1>Providers</h1>
                    </span>
                </div>
                <div className='flex gap-2 items-center bg-white shadow-md p-5 rounded-xl hover:bg-primary'>
                    <img className='w-25' src={supportImg} alt="" />
                    <span className='font-bold text-3xl'>
                        <h1 className='text-green-800'>24/7</h1>
                        <h1>Support</h1>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default WhyChooseUs;