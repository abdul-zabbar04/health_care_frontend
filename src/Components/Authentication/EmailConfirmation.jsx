import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const EmailConfirmation = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `https://health-care-nine-indol.vercel.app/${location.pathname}`
        );

        if (response.data.status === "success") {
          setMessage("Email successfully verified! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } else {
          setMessage("Email verification failed. Please try again.");
        }
      } catch (error) {
        setMessage("Invalid or expired verification link.");
      }
    };

    verifyEmail();
  }, [location.pathname, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default EmailConfirmation;
