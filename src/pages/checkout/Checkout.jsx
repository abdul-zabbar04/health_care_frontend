import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const Checkout = () => {
  const { id } = useParams(); // Get appointmentId from URL
  const navigate = useNavigate(); // To navigate back
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://health-care-nine-indol.vercel.app/api/doctor/appointments/${id}/`,
          {
            headers: { Authorization: `Token ${authToken}` },
          }
        );
        setAppointment(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handlePayment = async () => {
    setPayLoading(true);
    try {
      const response = await axios.get(
        `https://health-care-nine-indol.vercel.app/api/doctor/payment/${id}/`,
        {
          headers: { Authorization: `Token ${authToken}` },
        }
      );
  
      if (response.data.GatewayPageURL) {
        window.location.href = response.data.GatewayPageURL; // Redirect user to SSLCommerz payment page
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError("Payment initiation failed. Please try again.");
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment Details
      </h2>

      <div className="space-y-4 text-gray-700 border-b pb-4">
        <div className="flex justify-between">
          <span className="font-semibold">Patient:</span>
          <span>{appointment.patient_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Doctor:</span>
          <span>{appointment.doctor_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date:</span>
          <span>{appointment.appointment_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Time:</span>
          <span>{appointment.appointment_time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Reason:</span>
          <span>{appointment.reason}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Fee:</span>
          <span className="text-blue-600">৳{appointment.fee}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md transition"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          disabled={payLoading}
        >
          {payLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
