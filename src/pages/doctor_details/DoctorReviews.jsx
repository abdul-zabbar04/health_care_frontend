import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const DoctorReviews = () => {
    const { doctor } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get(`https://health-care-nine-indol.vercel.app/api/doctor/reviews/list/${doctor}/`)
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, [doctor]);

    if (loading) {
        return <p className="text-center text-gray-600 text-lg font-semibold">Loading...</p>;
    }

    if (reviews.length === 0) {
        return <p className="text-center text-gray-600 text-lg font-semibold">No reviews available.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6">
                Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Doctor Reviews</h2>
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex gap-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="min-w-[300px] bg-white shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{review.patient_full_name}</h3>
                            <p className="text-yellow-500 text-lg">{review.rating}</p>
                            <p className="text-gray-600 mt-2">{review.body}</p>
                            <p className="text-gray-400 text-sm mt-2">{new Date(review.created_on).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorReviews;
