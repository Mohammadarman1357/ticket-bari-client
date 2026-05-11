import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className="text-3xl">Payment is cancelled. Please try again. </h2>
            <Link to={"/dashboard/my-parcels"}>
                <button className='btn btn-primary text-secondary'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled; <h2 className="text-3xl">Paymen</h2>