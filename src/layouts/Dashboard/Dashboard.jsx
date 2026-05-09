import React from 'react';
import { FaMotorcycle, FaRegCreditCard, FaSwatchbook, FaTasks } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link, NavLink, Outlet } from 'react-router';
import { RiEBikeFill } from 'react-icons/ri';
import { SiGoogleads, SiGoogletasks } from 'react-icons/si';
import Logo from '../../components/Logo/Logo';
import { BsFillBusFrontFill } from 'react-icons/bs';
import useRole from '../../hooks/useRole';
import { MdOutlineManageAccounts, MdOutlineSpaceDashboard } from 'react-icons/md';
import { LuListCollapse, LuTicketPlus } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import { IoTicketOutline } from 'react-icons/io5';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import { GrOverview } from 'react-icons/gr';


const Dashboard = () => {
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto bg-[#EAECED]">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-white">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <span><LuListCollapse></LuListCollapse></span>
                    </label>
                    <div>
                        <Link to={'/'} className='flex flex-col'>
                            <h3 className="text-2xl text-green-600 font-bold">TicketBari</h3>
                            <p className='text-secondary text-xs'>Online Ticket Booking Platform</p>
                        </Link>
                    </div>
                </nav>

                {/* Page content here */}
                <div className='p-5'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow bg-white">
                        {/* List item */}
                        <li>
                            <Link to="/">
                                <span className='text-2xl text-secondary'><BsFillBusFrontFill></BsFillBusFrontFill></span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right focus:bg-primary" data-tip="Dashboard">
                                {/* Home icon */}
                                <span><MdOutlineSpaceDashboard></MdOutlineSpaceDashboard></span>
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </Link>
                        </li>

                        {/* Our dashboard links*/}
                        <li>
                            <NavLink to="/dashboard/profile" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                <span><CgProfile></CgProfile></span>
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/dashboard/booked-tickets" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Booked Tickets">
                                <span><IoTicketOutline></IoTicketOutline></span>
                                <span className="is-drawer-close:hidden">My Booked Tickets</span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/dashboard/transaction-history" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transaction History">
                                <span><FaRegCreditCard></FaRegCreditCard></span>
                                <span className="is-drawer-close:hidden">Transaction History</span>
                            </NavLink>

                        </li>

                        {/* vendor only links */}

                        {
                            role === 'vendor' && <>
                                <li>
                                    <NavLink to="/dashboard/add-tickets" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add-Tickets">
                                        <span><LuTicketPlus></LuTicketPlus></span>
                                        <span className="is-drawer-close:hidden">Add Tickets</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-added-tickets" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Added Tickets">
                                        <span><FaSwatchbook></FaSwatchbook></span>
                                        <span className="is-drawer-close:hidden">My Added Tickets</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requested-bookings" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Requested Bookings">
                                        <span><VscGitPullRequestGoToChanges /></span>
                                        <span className="is-drawer-close:hidden">Requested Bookings</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/revenue-overview" className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Revenue Overview">
                                        <span><GrOverview /></span>
                                        <span className="is-drawer-close:hidden">Revenue Overview</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        {/* admin only links */}
                        {
                            role === 'admin' && <>
                                <li>
                                    <NavLink to="/dashboard/manage-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Tickets">
                                        <span><MdOutlineManageAccounts /></span>
                                        <span className="is-drawer-close:hidden">Manage Tickets</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/advertise-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Advertise Tickets">
                                        <span><SiGoogleads /></span>
                                        <span className="is-drawer-close:hidden">Advertise Tickets</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                        <span><FaCircleUser></FaCircleUser></span>
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {/* List item */}
                        <li>
                            <button className="focus:bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;