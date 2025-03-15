import React from 'react';

const About = () => {
    return (
        <div className="sm:flex items-center max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
            {/* Image Section */}
            <div className="sm:w-1/2 p-6">
                <div className="image object-center text-center">
                    <img 
                        src="https://i.imgur.com/WbQnbas.png" 
                        alt="Online Doctor Meeting System" 
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="sm:w-1/2 p-6">
                <div className="text">
                    <span className="text-gray-600 border-b-2 border-indigo-600 uppercase font-semibold tracking-wide">
                        About Us
                    </span>
                    <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                        About <span className="text-indigo-600">Our Platform</span>
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Welcome to <span className="font-semibold text-indigo-600">Health Care</span>, your trusted online doctor meeting system. We are dedicated to providing seamless and secure virtual healthcare solutions, connecting patients with experienced doctors from the comfort of their homes.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Our platform is designed to make healthcare accessible, convenient, and efficient. Whether you need a routine check-up, specialist consultation, or follow-up care, Health Care ensures you receive the best medical attention anytime, anywhere.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Join thousands of satisfied users who have experienced the future of healthcare with Health Care. Your health is our priority.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;