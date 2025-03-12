import React, { useState } from 'react';
import axios from 'axios';
import newsletterImage from '../../assets/newsletter.png';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    // Check if input is empty
    if (!email.trim()) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Check if email format is invalid
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://health-care-nine-indol.vercel.app/api/contact/newsletter/', {
        email: email,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage('Subscription successful! 🎉');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-12 mx-[25px] rounded-lg shadow-lg text-center md:text-left">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-4">
        Subscribe To Our <span className="text-blue-600">Newsletter</span>
      </h2>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Illustration */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img src={newsletterImage} alt="Newsletter Illustration" className="max-w-full h-auto" />
        </div>

        {/* Right Side - Subscription Form */}
        <div className="w-full md:w-1/2">
          <p className="text-gray-600 mb-4">
            Want to get special offers before they run out? Subscribe to our email to get exclusive discounts and offers.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
