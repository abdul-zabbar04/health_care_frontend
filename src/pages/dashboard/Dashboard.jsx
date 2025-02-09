import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate= useNavigate();
    const [profileCompleted, setProfileCompleted] = useState(null);
    const [userType, setUserType] = useState(null);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        if (!authToken) {
            setProfileCompleted(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const userType = await getUserType(authToken);
                setUserType(userType);

                const profileUrl =
                    userType === "patient"
                        ? "https://health-care-nine-indol.vercel.app/api/account/patient-profile/"
                        : "https://health-care-nine-indol.vercel.app/api/account/doctor-profile/";

                const roleACData= await axios.get(profileUrl, { headers: { Authorization: `Token ${authToken}` } });
                const dashboard_data_api= userType === "patient"
                ? "https://health-care-nine-indol.vercel.app/api/doctor/appointments/"
                : "https://health-care-nine-indol.vercel.app/api/doctor/appointments/doctor/";
                console.log(dashboard_data_api);
                const dashboardData= await axios.get(dashboard_data_api, {
                    headers: { Authorization: `Token ${authToken}` }
                });
                console.log(dashboardData);
                console.log(roleACData);

                setProfileCompleted(true);
            } catch (error) {
                setProfileCompleted(false);
            }
        };

        fetchUserData();
    }, [authToken]);

    if (profileCompleted === null) return <div className="text-center my-10 text-gray-600">Loading...</div>;

    if (!profileCompleted)
        return (
            <div className="text-center my-10">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
                    Complete your profile to access the dashboard
                </h1>
                <button
                    className="btn btn-primary mt-4"
                    onClick={()=>navigate(userType === "patient" ? "/patient-register" : "/doctor-register")}
                >
                    Complete Registration
                </button>
            </div>
        );

    return userType === "patient" ? <PatientDashboard /> : <DoctorDashboard />;
};

// Separate function to get role
const getUserType = async (authToken) => {
    try {
        const { data } = await axios.get("https://health-care-nine-indol.vercel.app/api/auth/user/", {
            headers: { Authorization: `Token ${authToken}` },
        });
        console.log(data.role);
        return data.role; // Ensure your backend includes role in the response
    } catch (error) {
        console.error("Error fetching user type:", error);
        return null;
    }
};

const PatientDashboard = () => (
    <div className="text-center my-10">
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">Patient Dashboard</h1> */}

        <div className="text-center my-10">
                <h5 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-650 leading-tight">
                    Your Appointments
                </h5>
            </div>
            <div className="filter text-center my-8">
                <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All" />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Pending" />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Confirmed" />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Completed" />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Cancelled" />
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">No</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Doctor Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                    Appointment Created
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                    Schedule Start
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                    Appointment Status
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-800">1</td>
                                <td className="px-4 py-3 flex items-center space-x-2 text-sm text-gray-800">
                                    <span className="text-purple-600">
                                        <button className="btn btn-xs">View</button>
                                    </span>
                                    <span>Dr. Taposhi Akter</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800">2025-01-29 7:25 AM</td>
                                <td className="px-4 py-3 text-sm text-gray-800">2025-02-01 9:00 AM</td>
                                <td className="px-4 py-3">
                                    <span className="px-3 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="btn btn-success btn-xs mx-1">Pay</button>
                                    <button className="btn btn-error btn-xs mx-1">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
);

const DoctorDashboard = () => (
    <div className="text-center my-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">Doctor Dashboard</h1>
        <p>Show doctor-specific data here...</p>
    </div>
);

export default Dashboard;
