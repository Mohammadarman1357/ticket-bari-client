import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
        >
            {/* banner 1 */}
            <div
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                {/* dark overlay */}
                <div className="hero-overlay bg-black/60"></div>

                {/* content */}
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-5xl">

                        {/* heading */}
                        <h1 className="mb-6 text-4xl md:text-7xl font-extrabold leading-tight">
                            Book Bus, Train, Launch & Flight Tickets Easily
                        </h1>

                        {/* description */}
                        <p className="mb-8 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                            Experience fast, secure, and hassle-free online ticket booking
                            with TicketBari. Travel anywhere across Bangladesh with comfort
                            and confidence.
                        </p>

                        {/* badge */}
                        <div className="mt-6">
                            <span className="bg-[#CAEB66] text-black px-5 py-2 rounded-full text-sm md:text-base font-semibold shadow-lg">
                                Trusted Online Ticket Booking Platform
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Banner 2 */}
            <div
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="hero-overlay bg-black/60"></div>

                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-5xl">

                        <h1 className="mb-6 text-4xl md:text-7xl font-extrabold">
                            Book Comfortable Bus Tickets Easily
                        </h1>

                        <p className="mb-8 text-lg md:text-xl text-gray-200">
                            Travel across Bangladesh with safe, reliable and comfortable bus services.
                        </p>

                        <div className="mt-6">
                            <span className="bg-[#CAEB66] text-black px-5 py-2 rounded-full font-semibold">
                                Safe & Comfortable Journey
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            {/* Banner 3 */}
            <div
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1516528387618-afa90b13e000?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="hero-overlay bg-black/60"></div>

                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-5xl">

                        <h1 className="mb-6 text-4xl md:text-7xl font-extrabold">
                            Fast & Reliable Bus Booking System
                        </h1>

                        <p className="mb-8 text-lg md:text-xl text-gray-200">
                            Book your seat instantly and enjoy smooth highway journeys.
                        </p>

                        <div className="mt-6">
                            <span className="bg-[#CAEB66] text-black px-5 py-2 rounded-full font-semibold">
                                Instant Ticket Booking
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            {/* Banner 4 */}
            <div
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
                }}
            >
                <div className="hero-overlay bg-black/70"></div>

                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-5xl">

                        <h1 className="mb-6 text-4xl md:text-7xl font-extrabold">
                            Night Bus Travel Made Easy
                        </h1>

                        <p className="mb-8 text-lg md:text-xl text-gray-200">
                            Enjoy safe night journeys with top-rated bus services.
                        </p>

                        <div className="mt-6">
                            <span className="bg-[#CAEB66] text-black px-5 py-2 rounded-full font-semibold">
                                24/7 Service Available
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            {/* Banner 5 */}
            <div
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="hero-overlay bg-black/60"></div>

                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-5xl">

                        <h1 className="mb-6 text-4xl md:text-7xl font-extrabold">
                            Explore Bangladesh with Ease
                        </h1>

                        <p className="mb-8 text-lg md:text-xl text-gray-200">
                            Book bus tickets and enjoy beautiful scenic routes across the country.
                        </p>

                        <div className="mt-6">
                            <span className="bg-[#CAEB66] text-black px-5 py-2 rounded-full font-semibold">
                                Best Travel Experience
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </Carousel>

    );
};

export default Banner;