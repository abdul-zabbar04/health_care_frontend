import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post(
                    "https://health-care-nine-indol.vercel.app/api/auth/logout/",
                    {},
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("authToken")}`, // Adjust if using JWT
                        },
                    }
                );

                // Remove token from local storage
                localStorage.removeItem("authToken");
                localStorage.removeItem("userRole");

                alert("Logged out successfully!");
                navigate("/login"); // Redirect to home page after logout
            } catch (error) {
                console.error("Logout Error:", error.response?.data || error.message);
                alert("An error occurred during logout. Please try again.");
            }
        };

        handleLogout();
    }, [navigate]);

    return <div className="text-center">Logging out...</div>; // Display a temporary message while logging out
};

export default Logout;
