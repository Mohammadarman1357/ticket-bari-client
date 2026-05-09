import React from 'react';
import { BsFillBusFrontFill } from 'react-icons/bs';

const Logo = () => {
    return (
        <div className='flex items-center'>
            <span className='text-4xl text-secondary mr-1'><BsFillBusFrontFill></BsFillBusFrontFill></span>
            <span className='flex flex-col'> 
                <h3 className="text-3xl text-green-600 font-bold">TicketBari</h3>
                <p className='text-secondary text-xs'>Online Ticket Booking Platform</p></span>
        </div>
    );
};

export default Logo;