import React from 'react';
import Banner from '../Banner/Banner';
import { Outlet } from 'react-router';
import Advertisement from '../Advertisement/Advertisement';

const Home = () => {
    return (
        <div className='mx-5 md:mx-15 space-y-10 mt-5'>
            <Banner></Banner>
            <Advertisement></Advertisement>
        </div>
    );
};

export default Home;