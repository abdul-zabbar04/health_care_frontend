import { Link } from "react-router";

const SuccessPayment = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Payment Successful!
      </h2>
      <p className="text-center text-lg text-green-600 font-semibold mb-4">
        Your payment has been processed successfully. You can now proceed with your appointment.
      </p>
      <div className="text-center">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
