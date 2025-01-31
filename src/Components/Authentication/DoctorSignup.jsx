import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PatientSignup = () => {
  const authToken = localStorage.getItem('authToken'); // Getting the token from localStorage
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for specializations
  const [error, setError] = useState(null); // Error state for specializations

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetching specializations on component mount
  useEffect(() => {
    const fetchSpecializations = async () => {
        try {
          const response = await axios.get('https://health-care-nine-indol.vercel.app/api/filter/specialization/');
          setSpecializations(response.data);  // Set specializations data
          setLoading(false); // Finished loading
        } catch (error) {
          setError("Failed to load specializations");
          setLoading(false);
        }
      };

    fetchSpecializations();
  }, [authToken]);
//   const onSubmit = (data) => console.log(data);
  // On form submit
  const onSubmit = async (data) => {
    try {
      // Sending form data and token in the request
      const response = await axios.post(
        'https://health-care-nine-indol.vercel.app/api/account/register/profile/', 
        data,  // The form data
        {
          headers: {
            Authorization: `Token ${authToken}`,  // Passing the token in the headers
            'Content-Type': 'application/json',  // Make sure the request is sent as JSON
          },
        }
      );
      console.log(response.data);  // Success response
      alert('Registration successful!');
    } catch (error) {
      console.error(error.response?.data || 'Something went wrong');
      alert(error.response?.data?.detail || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Complete Your Doctor Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg px-6 py-8 shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="BMDC_number">
                BMDC_number
              </label>
              <input
                {...register('BMDC_number', { required: 'BMDC_number is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="BMDC_number"
                type="number"
                placeholder="Enter your BMDC_number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="degrees">
                Your degrees
              </label>
              <input
                {...register('degrees', { required: 'Degrees are required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="degrees"
                type="text"
                placeholder="Enter your degrees"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="specialization">
                Specialization
              </label>
              <select
                id="specialization"
                {...register('specialization', { required: 'Specialization is required' })}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Specialization</option>
                {loading && <option>Loading...</option>} {/* Show loading */}
                {error && <option>{error}</option>} {/* Show error if any */}
                {!loading && !error && specializations.map((specialization) => (
                  <option key={specialization.id} value={specialization.id}>
                    {specialization.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional fields */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="hospital_name">
                Hospital Name
              </label>
              <input
                {...register('hospital_name', { required: 'Hospital name is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hospital_name"
                type="text"
                placeholder="Enter hospital name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="experience">
                Experience (Years)
              </label>
              <input
                {...register('experience', { required: 'Experience is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="experience"
                type="number"
                placeholder="Enter years of experience"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="biography">
                Biography
              </label>
              <textarea
                {...register('biography', { required: 'Biography is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="biography"
                placeholder="Enter your biography"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="meeting_link">
                Meeting Link (e.g., Google Meet)
              </label>
              <input
                {...register('meeting_link', { required: 'Meeting link is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="meeting_link"
                type="url"
                placeholder="Enter your meeting link"
              />
            </div>

            <div className="flex justify-left">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
