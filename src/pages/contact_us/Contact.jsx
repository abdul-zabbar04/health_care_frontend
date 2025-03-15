import React, { useState } from "react";
import axios from "axios";
import contactImg from '../../assets/newsletter.png'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage(null);

        try {
            const response = await axios.post("https://health-care-nine-indol.vercel.app/api/contact/", formData);
            
            if (response.status === 201) {
                setResponseMessage("Your message has been sent successfully!");
                setFormData({ name: "", email: "", message: "" }); // Reset form
            }
        } catch (error) {
            setResponseMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Heading Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How Can We Help You?
                        </h2>
                        <p className="text-lg text-gray-600">
                            We're here to assist you. Fill out the form below, and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Response Message */}
                    {responseMessage && (
                        <div className={`mb-8 text-center px-4 py-3 rounded-md shadow-sm ${
                            responseMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                            {responseMessage}
                        </div>
                    )}

                    {/* Contact Section with Image */}
                    <div className="flex flex-col lg:flex-row items-stretch gap-8">
                        {/* Contact Image Card */}
                        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src={contactImg} // Replace with your professional contact image
                                alt="Contact Us"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Contact Form Card */}
                        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <form onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;