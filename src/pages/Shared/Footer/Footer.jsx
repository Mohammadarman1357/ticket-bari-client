import React from 'react';
import { FaCar, FaFacebook, FaLinkedinIn, FaStripe } from 'react-icons/fa';
import { FaSkype, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { MdEmail } from 'react-icons/md';
import { BiPhone } from 'react-icons/bi';

const Footer = () => {
    return (
        <div className='bg-gradient-to-tr from-[#CAEB66] via-[#F4FFD1] to-yellow-200 py-4 px-8 inter-font'>

            <footer className="footer sm:footer-horizontal p-10 text-secondary">
                <nav>
                    <Link to={'/'}>
                        <Logo></Logo>
                    </Link>
                    <p>
                        Book bus, train, launch & flight tickets easily with TicketBari. <br />
                        Fast, secure, and hassle-free online ticket booking platform <br />
                        for your everyday travel needs.
                    </p>
                </nav>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">All Tickets</a>
                    <a className="link link-hover">Contact Us</a>
                    <a className="link link-hover">About</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Contacts Info</h6>
                    <a className="link link-hover flex items-center gap-1"><MdEmail></MdEmail> <span>support@ticketbari.com</span></a>
                    <a className="link link-hover flex items-center gap-1"><BiPhone></BiPhone><span>+8801875-****09</span></a>
                    <a className="link link-hover flex items-center gap-1"><FaFacebook></FaFacebook><span>www.facebook.com</span></a>
                </nav>
                <nav>
                    <h6 className="footer-title">Payment Methods</h6>
                    <a className="link link-hover "><FaStripe className='text-5xl'></FaStripe><button className='btn btn-primary text-secondary font-bold'>Pay Now</button></a>

                </nav>

            </footer>

            <hr className='border-[#cacacaca] my-4' />
            <p className='text-center'>Copyright © 2026 Ticket Bari- All right reserved</p>
        </div>
    );
};

export default Footer;