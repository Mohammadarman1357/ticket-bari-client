import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from '../../assets/images/authImage.png';
import Logo from '../../components/Logo/Logo';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto p-4'>
            <Link to={'/'}>
                <Logo></Logo>
            </Link>
            <div className='flex flex-col md:flex-row items-center p-10'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;