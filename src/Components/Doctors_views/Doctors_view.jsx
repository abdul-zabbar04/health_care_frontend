import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const DoctorsView = ({ specialization_id = null, health_concern_id = null }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Log the received ids for debugging
    console.log(specialization_id, "this is specialization id");
    console.log(health_concern_id, "this is health concern id");

    useEffect(() => {
        setLoading(true); // Reset loading state

        // Determine the API URL based on the available ID
        let url = '';

        if (specialization_id) {
            url = `https://health-care-nine-indol.vercel.app/api/doctor/list/specialization/${specialization_id}/`;
        } else if (health_concern_id) {
            url = `https://health-care-nine-indol.vercel.app/api/doctor/list/health_concern/${health_concern_id}/`;
        } else {
            url = 'https://health-care-nine-indol.vercel.app/api/doctor/list/'; // Default API if neither id is provided
        }

        // Fetch doctors from the API
        axios.get(url)
            .then(response => {
                setDoctors(response.data);
                setLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error("Error fetching doctor list:", error);
                setLoading(false); // Stop loading if there is an error
            });
    }, [specialization_id, health_concern_id]); // Only run when either of these ids change

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
                    Specialist Doctors
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 mt-2">
                    Consult with any doctor according to your need
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={doctor.user.profile_image}
                                        alt={doctor.user.first_name}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-300"
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-bold text-gray-800">{doctor.user.first_name + " " + doctor.user.last_name}</h3>
                                        <p className="text-sm text-gray-500">{doctor.specialization.name}</p>
                                        <p className="text-sm text-gray-500">{doctor.degrees}</p>
                                        <p className="text-sm text-gray-500">{doctor.hospital_name}</p>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold text-purple-600">৳ {doctor.fee}</p>
                                <p className="text-sm text-gray-600 mt-2"><span>BMDC Number: </span>{doctor.BMDC_number}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <Link to={`/appointment/${doctor.id}`} className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600">
                                        Book Now
                                    </Link>
                                    <Link to={`/doctor/${doctor.id}`} className="text-purple-500 font-medium hover:underline">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">No doctors available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorsView;
