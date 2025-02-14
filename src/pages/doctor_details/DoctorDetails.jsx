import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        axios.get(`https://health-care-nine-indol.vercel.app/api/doctor/list/${id}`)
            .then(response => setDoctor(response.data))
            .catch(error => console.error("Error fetching doctor details:", error));
    }, [id]);

    if (!doctor) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Doctor Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-6">
                    <img
                        src={doctor.user.profile_image}
                        alt={doctor.user.first_name}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-purple-300"
                    />
                    <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {doctor.user.first_name} {doctor.user.last_name}
                        </h2>
                        <p className="text-lg text-gray-500">{doctor.specialization.name}</p>
                        <p className="text-md text-gray-500 mt-2">BMDC Number: {doctor.BMDC_number}</p>
                        <p className="text-md text-gray-500">{doctor.degrees}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-800 text-center sm:text-left">
                        Easy Access to Doctor Reviews & Appointments
                    </h3>
                    <p className="text-gray-600 text-center sm:text-left">
                        Check patient reviews to make an informed decision, and book an appointment with just a click. Get the best healthcare experience effortlessly!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link
                            to={`/reviews/${doctor.id}`}
                            className="w-full sm:w-auto text-center bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600"
                        >
                            Doctor Reviews
                        </Link>
                        <Link
                            to={`/appointment/${doctor.id}`}
                            className="w-full sm:w-auto text-center bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Biography and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800">Biography</h3>
                    <p className="text-gray-600 mt-4">{doctor.biography || 'No biography available.'}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
                    <p className="text-gray-600 mt-4">{doctor.experience} years of experience</p>
                    <p className="text-gray-600 mt-2">Hospital: {doctor.hospital_name}</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <p className="text-gray-600 mt-4">Email: {doctor.user.email}</p>
                <p className="text-gray-600 mt-2">Last Login: {new Date(doctor.user.last_login).toLocaleString()}</p>
                <p className="text-gray-600 mt-2">Date Joined: {new Date(doctor.user.date_joined).toLocaleString()}</p>
            </div>

            {/* Verification Status */}
            {doctor.next_verification && (
                <div className="bg-yellow-100 text-yellow-800 p-4 mt-6 rounded-lg text-center">
                    <h4 className="font-semibold">Verified by Smart Health Care</h4>
                    <p>You can confidently avail their services.</p>
                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
