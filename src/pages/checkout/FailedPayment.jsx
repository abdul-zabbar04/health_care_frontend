import { Link } from "react-router";

const FailedPayment = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Payment Failed!
      </h2>
      <p className="text-center text-lg text-red-600 font-semibold mb-4">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div className="text-center">
        <Link
          to="/" // Replace "/home" with the actual route to go back to the home page
          className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default FailedPayment;
