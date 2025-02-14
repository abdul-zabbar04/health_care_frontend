import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const ReviewForm = () => {
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const {doctor} = useParams()
    const {patient} = useParams()
    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            rating,
            body,
            doctor,
            patient,
        };

        axios.post(`https://health-care-nine-indol.vercel.app/api/doctor/review/${doctor}/`, reviewData, {
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then(response => {
                setRating('');
                setBody('');
                alert('Review submitted successfully!');
            })
            .catch(error => {
                alert('Error submitting review.');
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-center mb-4">Leave a Review</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Rating (Star-based using DaisyUI) */}
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-700">Rating</label>
                    <div className="rating mb-2">
                        <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" onClick={() => setRating('★')} />
                        <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" onClick={() => setRating('★★')} />
                        <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" onClick={() => setRating('★★★')} />
                        <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" onClick={() => setRating('★★★★')} />
                        <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" onClick={() => setRating('★★★★★')} />
                    </div>
                </div>

                {/* Review Body */}
                <div className="mb-4">
                    <label htmlFor="body" className="block text-gray-700">Your Review</label>
                    <textarea
                        id="body"
                        name="body"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        maxLength="300"
                        placeholder="Write your review here..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-full">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
