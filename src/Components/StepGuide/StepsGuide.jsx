import React from 'react';
import doctorIcon from '../../assets/StepsGuide_icons/doctor_icon.png';  // Replace with actual paths
import appointmentIcon from '../../assets/StepsGuide_icons/appointment.png';
import servicesIcon from '../../assets/StepsGuide_icons/service.png';

const StepsGuide = () => {
    return (
        <div className="text-center my-8 mt-20 px-6 sm:px-8 md:px-10 lg:px-12">
            {/* Header Section */}
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    How It Works
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-500 mt-2">
                    Simple Steps to Get the Care You Need
                </p>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto relative">
                {/* Dashed Line */}
                <div className="absolute top-1/2 left-0 right-0 w-full border-t-2 border-dashed border-gray-300 hidden sm:block"></div>

                {/* Step 1: Find Your Doctor */}
                <div className="relative bg-white z-10 flex flex-col items-center w-full sm:w-1/3 mb-8 sm:mb-0">
                    <div className="rounded-full bg-indigo-100 w-20 h-20 flex items-center justify-center shadow-lg">
                        <img src={doctorIcon} alt="Find Your Doctor" className="w-10 h-10" />
                    </div>
                    <div className="rounded-full bg-indigo-600 w-12 h-12 flex items-center justify-center font-bold text-lg text-white mt-4 shadow-md">
                        1
                    </div>
                    <h4 className="text-xl font-bold text-indigo-900 mt-4">Find Your Doctor</h4>
                    <p className="text-gray-600 text-sm mt-2 px-4">
                        Search for your preferred doctor or clinic by location, specialty, or availability.
                    </p>
                </div>

                {/* Step 2: Make an Appointment */}
                <div className="relative bg-white z-10 flex flex-col items-center w-full sm:w-1/3 mb-8 sm:mb-0">
                    <div className="rounded-full bg-indigo-100 w-20 h-20 flex items-center justify-center shadow-lg">
                        <img src={appointmentIcon} alt="Make an Appointment" className="w-10 h-10" />
                    </div>
                    <div className="rounded-full bg-indigo-600 w-12 h-12 flex items-center justify-center font-bold text-lg text-white mt-4 shadow-md">
                        2
                    </div>
                    <h4 className="text-xl font-bold text-indigo-900 mt-4">Make an Appointment</h4>
                    <p className="text-gray-600 text-sm mt-2 px-4">
                        Book your appointment online at a time that works best for you.
                    </p>
                </div>

                {/* Step 3: Get Services */}
                <div className="relative bg-white z-10 flex flex-col items-center w-full sm:w-1/3">
                    <div className="rounded-full bg-indigo-100 w-20 h-20 flex items-center justify-center shadow-lg">
                        <img src={servicesIcon} alt="Get Services" className="w-10 h-10" />
                    </div>
                    <div className="rounded-full bg-indigo-600 w-12 h-12 flex items-center justify-center font-bold text-lg text-white mt-4 shadow-md">
                        3
                    </div>
                    <h4 className="text-xl font-bold text-indigo-900 mt-4">Get Services</h4>
                    <p className="text-gray-600 text-sm mt-2 px-4">
                        Receive personalized care and solutions tailored to your health needs.
                    </p>
                </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="mt-12">
                <a href='./' className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg">
                    Get Started Today
                </a>
            </div>

            {/* Testimonial Section */}
            <div className="mt-16 w-full mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    What Our Patients Say
                </h2>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <p className="text-gray-600 italic">
                        "I found the perfect doctor for my needs and booked an appointment in just a few clicks. The platform is so easy to use, and the care I received was exceptional!"
                    </p>
                    <p className="text-gray-800 font-semibold mt-4">- Sarah Johnson</p>
                </div>
            </div>
        </div>
    );
};

export default StepsGuide;