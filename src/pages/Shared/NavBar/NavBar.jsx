import React from 'react';
import { Link, NavLink } from 'react-router';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth';
import Logo from '../../../components/Logo/Logo';
// import useTheme from '../../../hooks/useTheme';
import { BiMoon } from 'react-icons/bi';
import { IoSunny } from 'react-icons/io5';
import { CgLogOut } from 'react-icons/cg';

const NavBar = () => {

    const { user, logOut } = useAuth();
    // const { theme, toggleTheme } = useTheme();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => {
                console.log(error);
            })
    }

    const links = <>
        <li><NavLink to={"/"} className={'text-[#606060] font-medium focus:bg-primary'}>Home</NavLink></li>
        <li><NavLink to="/all-tickets" className={'text-[#606060] font-medium focus:bg-primary'}>All Tickets</NavLink></li>
        <li><NavLink to={"/dashboard"} className={'text-[#606060] font-medium focus:bg-primary'}>Dashboard</NavLink></li>
        <li>
            {/* <button
                onClick={toggleTheme}
                className="btn btn-circle bg-primary border-none text-secondary"
            >
                {theme === "light" ? (
                    <BiMoon size={20} />
                ) : (
                    <IoSunny size={20} />
                )}
            </button> */}

        </li>

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm md:py-4 md:px-5 rounded-br-2xl rounded-bl-2xl sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                        {links}
                    </ul>
                </div>
                <span>
                    <Link to={'/'}>
                        <Logo></Logo>
                    </Link>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?

                        (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt="user"
                                        className="w-10 h-10 rounded-full object-cover border-1"
                                    />

                                    <h2 className="hidden md:block text-secondary font-semibold">
                                        {user?.displayName}
                                    </h2>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52"
                                >
                                    <div className='flex flex-col items-center '>
                                        <span>
                                            <img className='w-12 h-12 rounded-full items-center' src={user?.photoURL} alt="" />
                                        </span>
                                        <h2 className='text-secondary font-semibold text-xl'>{user?.displayName}</h2>

                                        <Link to="/my-profile">
                                            <button className='btn btn-primary text-secondary mt-2'>My Profile</button>
                                        </Link>
                                        <li onClick={handleLogOut}
                                            className="mt-2">
                                            <span className='flex flex-row justify-center gap-2  hover:btn hover:btn-primary hover:text-secondary text-[16px]'>Logout <CgLogOut /></span>

                                        </li>

                                    </div>

                                </ul>
                            </div>
                        )
                        :
                        <>
                            <Link to="/login" className="btn btn-primary btn-[#606060] rounded-xl text-[#606060]">Login</Link>
                        </>
                }
            </div>
        </div >
    );
};

export default NavBar;