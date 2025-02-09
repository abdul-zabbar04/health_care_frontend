import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const DoctorSignup = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          'https://health-care-nine-indol.vercel.app/api/filter/specialization/'
        );
        setSpecializations(response.data);
      } catch (error) {
        setError('Failed to load specializations');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecializations();
  }, []);

  const onSubmit = async (data) => {
    console.log('Submitting Data:', data);
    try {
      const response = await axios.post(
        'https://health-care-nine-indol.vercel.app/api/account/register/profile/',
        {
          ...data,
          specialization: parseInt(data.specialization, 10),
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Registration successful!');
      reset();
      navigate('/view-profile');
    } catch (error) {
      console.error('Error:', error.response?.data || 'Something went wrong');
      alert(error.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Complete Your Doctor Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="BMDC_number">
              BMDC Number
            </label>
            <input
              {...register('BMDC_number', { required: 'BMDC number is required' })}
              type="number"
              className="w-full border rounded p-2"
              placeholder="Enter your BMDC number"
            />
            {errors.BMDC_number && <p className="text-red-500 text-sm">{errors.BMDC_number.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="degrees">
              Degrees
            </label>
            <input
              {...register('degrees', { required: 'Degrees are required' })}
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter your degrees"
            />
            {errors.degrees && <p className="text-red-500 text-sm">{errors.degrees.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="specialization">
              Specialization
            </label>
            <select
              {...register('specialization', { required: 'Specialization is required' })}
              className="w-full border rounded p-2"
            >
              <option value="">Select Specialization</option>
              {loading && <option>Loading...</option>}
              {error && <option>{error}</option>}
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="hospital_name">
              Hospital Name
            </label>
            <input
              {...register('hospital_name', { required: 'Hospital name is required' })}
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter hospital name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="experience">
              Experience (Years)
            </label>
            <input
              {...register('experience', { required: 'Experience is required' })}
              type="number"
              className="w-full border rounded p-2"
              placeholder="Enter years of experience"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="biography">
              Biography
            </label>
            <textarea
              {...register('biography', { required: 'Biography is required' })}
              className="w-full border rounded p-2"
              placeholder="Enter your biography"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="meeting_link">
              Meeting Link (Google Meet, Zoom, etc.)
            </label>
            <input
              {...register('meeting_link', { required: 'Meeting link is required' })}
              type="url"
              className="w-full border rounded p-2"
              placeholder="Enter your meeting link"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
