import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

const Appointment = () => {
    const navigate= useNavigate()
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState(""); // Add time state
    const [reason, setReason] = useState("");
    const [patientId, setPatientId] = useState(null); // Ensure patient ID is set
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams(); // Get doctor ID from URL
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://health-care-nine-indol.vercel.app/api/account/patient-profile/", {
                    headers: { Authorization: `Token ${authToken}` },
                });
                setPatientId(response.data.id); // Ensure we get patient ID
            } catch (err) {
                console.error("Error fetching patient data:", err);
            }
        };

        fetchUserData();
    }, [authToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!authToken) {
            setError("User not authenticated. Please log in again.");
            return;
        }

        if (!patientId) {
            setError("Failed to fetch patient ID. Try again.");
            return;
        }

        if (!appointmentTime) {
            setError("Please select a time slot.");
            return;
        }

        const appointmentData = {
            appointment_date: appointmentDate,
            appointment_time: appointmentTime, // Include time in the data
            reason: reason,
            doctor: id, // Ensure doctor is included
            patient: patientId, // Include patient ID
        };

        setLoading(true);
        try {
            const response = await axios.post(
                `https://health-care-nine-indol.vercel.app/api/doctor/appointments/create/${id}/`,
                appointmentData,
                {
                    headers: {
                        Authorization: `Token ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("API Response:", response);
            if (response.status === 201) {
                alert("Appointment created successfully!");
                setAppointmentDate("");
                setAppointmentTime(""); // Reset time slot
                setReason("");
                navigate(`/checkout/${response.data.id}`);
            }
        } catch (err) {
            console.error("API Error:", err.response?.data);

            if (err.response?.data?.non_field_errors) {
                setError(err.response.data.non_field_errors[0]); // Display non-field error
            } else if (err.response?.data?.detail) {
                setError(err.response.data.detail); // General error
            } else {
                setError("Failed to create appointment. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Create Appointment</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600">Appointment Date:</label>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Time Slot:</label>
                        <select
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select a time slot</option>
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Reason:</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter reason for the appointment"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Appointment"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Appointment;
