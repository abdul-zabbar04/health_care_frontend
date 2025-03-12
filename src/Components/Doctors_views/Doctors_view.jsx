import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const DoctorsView = ({ specialization_id = null, health_concern_id = null }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [nextPage, setNextPage] = useState(null); // URL for next page
    const [previousPage, setPreviousPage] = useState(null); // URL for previous page

    useEffect(() => {
        setLoading(true); // Reset loading state
        setCurrentPage(1); // Reset pagination when filters change

        // Construct API URL dynamically
        let apiUrl = '';
        if (specialization_id) {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/specialization/${specialization_id}/`;
        } else if (health_concern_id) {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/health_concern/${health_concern_id}/`;
        } else {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/`;
        }

        fetchDoctors(apiUrl, 1); // Fetch first page when filter changes

    }, [specialization_id, health_concern_id]); // Reset page on filter change

    useEffect(() => {
        let apiUrl = '';

        if (specialization_id) {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/specialization/${specialization_id}/`;
        } else if (health_concern_id) {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/health_concern/${health_concern_id}/`;
        } else {
            apiUrl = `https://health-care-nine-indol.vercel.app/api/doctor/list/`;
        }

        fetchDoctors(apiUrl, currentPage);

    }, [currentPage]); // Fetch doctors when page changes

    // Fetch Doctors Function
    const fetchDoctors = (baseUrl, page) => {
        let apiUrl = baseUrl;
        if (page > 1) apiUrl += `?page=${page}`;

        axios.get(apiUrl)
            .then(response => {
                console.log('API Response:', response.data); // Debugging

                const data = response.data.results || []; // Safely access 'results'
                setDoctors(data);

                // Handle pagination using API response
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching doctor list:", error);
                setLoading(false);
            });
    };

    // Function to go to the next page
    const goToNextPage = () => {
        if (nextPage) setCurrentPage(prev => prev + 1);
    };

    // Function to go to the previous page
    const goToPreviousPage = () => {
        if (previousPage) setCurrentPage(prev => prev - 1);
    };

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight mt-20">
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
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 px-[25px]">
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <div key={doctor.id} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
                                    <div className="flex flex-col items-center mb-4">
                                        <img
                                            src={doctor.user.profile_image}
                                            alt={doctor.user.first_name}
                                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-300 mb-3"
                                        />
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {doctor.user.first_name} {doctor.user.last_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{doctor.specialization.name}</p>
                                    </div>
                                    <p className="text-xl font-semibold text-purple-600 text-center">৳ {doctor.fee}</p>
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

                    {/* Pagination controls */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <button
                            onClick={goToPreviousPage}
                            disabled={!previousPage}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span className="flex items-center text-lg">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={!nextPage}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsView;
