import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const PatientSignup = () => {
  const navigate= useNavigate();
  const authToken = localStorage.getItem('authToken'); // Getting the token from localStorage
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // On form submit
  const onSubmit = async (data) => {
    try {
      // Sending form data and token in the request
      const response = await axios.post(
        'https://health-care-nine-indol.vercel.app/api/account/register/profile/',  // Replace with your actual API endpoint
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
      reset();
      navigate('/view-profile'); 
      
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
            Complete Your Patient Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg px-6 py-8 shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
                Your Age
              </label>
              <input
                {...register('age', { required: 'Age is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="number"
                placeholder="Enter your age"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender', { required: 'Gender is required' })}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="height_ft">
                Height(Feet only)
              </label>
              <select
                {...register('height_ft', { required: 'Height ft is required' })}
                id="height_ft"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="height_in">
                Height(Inch only)
              </label>
              <select
                {...register('height_in', { required: 'Height_in is required' })}
                id="height_in"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">
                Your Weight
              </label>
              <input
                {...register('weight_kg', { required: 'Weight is required' })}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="weight"
                type="number"
                placeholder="Enter your weight"
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
