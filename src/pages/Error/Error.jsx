import React from 'react';
import { useNavigate } from 'react-router';
import errorImg from '../../assets/images/error-404.png';

const Error = () => {
    const navigate = useNavigate()

    return (
        <div className='max-w-7xl mx-auto'>
            {/* <Navbar></Navbar> */}

            <div className='p-10 md:p-20 text-center'>

                <span className='flex justify-center'><img src={errorImg} alt="" /></span>
                <h1 className='font-semibold text-5xl text-[#001931] mt-2'>Oops, page not found!</h1>
                <p className='text-xl text-[#627382]'>The page you are looking for is not available.</p>

                <button onClick={() => navigate(-1)} className='btn border-none mt-4 bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-white px-5'>
                    Go Back
                </button>
            </div>

        </div>
    );
};

export default Error;