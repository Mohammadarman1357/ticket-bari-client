import React from 'react';
import Banner from '../Banner/Banner';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div className='mx-5 md:mx-15 space-y-10 mt-5'>
            <Banner></Banner>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;