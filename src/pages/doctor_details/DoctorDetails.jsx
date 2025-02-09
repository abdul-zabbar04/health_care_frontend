import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const DoctorDetails = () => {
    const { id } = useParams();  // Get doctor ID from the URL
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        // Fetch doctor details from the API
        axios.get(`https://health-care-nine-indol.vercel.app/api/doctor/list/${id}`)
            .then(response => {
                setDoctor(response.data);
            })
            .catch(error => {
                console.error("Error fetching doctor details:", error);
            });
    }, [id]);

    if (!doctor) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Doctor Profile Header */}
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-6 mb-8">
                <img
                    src={doctor.user.profile_image}
                    alt={doctor.user.first_name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-purple-300"
                />
                <div className="ml-4 sm:ml-8 text-center sm:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {doctor.user.first_name} {doctor.user.last_name}
                    </h2>
                    <p className="text-lg text-gray-500">{doctor.specialization.name}</p>
                    <p className="text-md text-gray-500 mt-2">BMDC Number: {doctor.BMDC_number}</p>
                    <p className="text-md text-gray-500">{doctor.degrees}</p>
                </div>
            </div>

            {/* Biography and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            {/* Contact Info and Meeting Link */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <p className="text-gray-600 mt-4">Email: {doctor.user.email}</p>
                <p className="text-gray-600 mt-2">Last Login: {new Date(doctor.user.last_login).toLocaleString()}</p>
                <p className="text-gray-600 mt-2">Date Joined: {new Date(doctor.user.date_joined).toLocaleString()}</p>
            </div>

            {/* Meeting Link */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Meeting Link</h3>
                <a
                    href={doctor.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 mt-4 block"
                >
                    Join a Meeting
                </a>
            </div>

            {/* Verification Status */}
            {doctor.next_verification && (
                <div className="bg-yellow-100 text-yellow-800 p-4 mt-8 rounded-lg">
                    <h4 className="font-semibold">This doctor is verified by Smart Health Care.
                    </h4>
                    <p>You can confidently avail their services</p>
                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
