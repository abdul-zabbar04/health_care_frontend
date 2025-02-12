import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileCompleted, setProfileCompleted] = useState(null);
    const [appointments, setAppointments] = useState([]);
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

                const roleACData = await axios.get(profileUrl, { headers: { Authorization: `Token ${authToken}` } });

                setProfileCompleted(true);
            } catch (error) {
                setProfileCompleted(false);
            }
        };
        const fetchDashboardData = async () => {
            try {
                // Fetch the user type to determine the dashboard data URL
                const userType = await getUserType(authToken);

                // Determine the dashboard data URL based on user type
                const dashboardDataApi =
                    userType === "patient"
                        ? "https://health-care-nine-indol.vercel.app/api/doctor/appointments/"
                        : "https://health-care-nine-indol.vercel.app/api/doctor/appointments/doctor/";

                console.log(dashboardDataApi);

                // Fetch dashboard data
                const dashboardData = await axios.get(dashboardDataApi, {
                    headers: { Authorization: `Token ${authToken}` }
                });

                console.log(dashboardData);
                setAppointments(dashboardData.data);

            } catch (error) {
                // Log error details to help with debugging
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchUserData();
        fetchDashboardData();
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
                    onClick={() => navigate(userType === "patient" ? "/patient-register" : "/doctor-register")}
                >
                    Complete Registration
                </button>
            </div>
        );

    return userType === "patient" ? <PatientDashboard appointments={appointments} /> : <DoctorDashboard appointments={appointments} />;
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

const PatientDashboard = ({ appointments }) => {
    return (
        <div className="text-center my-10">
            <div className="text-center my-10">
                <h5 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-650 leading-tight">
                    Your Appointments
                </h5>
            </div>

            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">No</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Doctor Name</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Reason
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Schedule Start
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Appointment Status
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No appointments available.
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((appointment, index) => (
                                    <tr key={appointment.id}>
                                        <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                                        <td className="px-4 py-3 flex items-center space-x-2 text-sm text-gray-800">
                                            <span className="text-purple-600">
                                                {appointment.is_paid ? (
                                                    <Link target="_blank" to={appointment.meeting_link} className="btn btn-xs">
                                                        Meet
                                                    </Link>
                                                ) : (
                                                    <span className="btn btn-xs disabled">Payment to get meet link</span>
                                                )}
                                            </span>
                                            <span>{appointment.doctor_name}</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {appointment.reason}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {`${appointment.appointment_date} ${appointment.appointment_time}`}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${appointment.status === "Pending"
                                                    ? "text-pink-700 bg-pink-100"
                                                    : appointment.status === "Confirmed"
                                                        ? "text-green-700 bg-green-100"
                                                        : "text-gray-700 bg-gray-100"
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                to={appointment.is_paid ? "#" : `/checkout/${appointment.id}`}
                                                className={`btn btn-xs mx-1 ${appointment.is_paid ? "btn-success opacity-50 pointer-events-none" : "btn-warning"}`}
                                                tabIndex={appointment.is_paid ? "-1" : "0"}
                                            >
                                                {appointment.is_paid ? "Paid" : "Pay"}
                                            </Link>
                                            {!appointment.is_paid && (
                                                <button className="btn btn-error btn-xs mx-1">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const DoctorDashboard = ({ appointments }) => {
    return (
        <div className="text-center my-10">
            <div className="text-center my-10">
                <h5 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-650 leading-tight">
                    Your Appointments
                </h5>
            </div>

            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">No</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Patient Name</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Reason
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Schedule Start
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                    Appointment Status
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No appointments available.
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((appointment, index) => (
                                    <tr key={appointment.id}>
                                        <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                                        <td className="px-4 py-3 flex items-center space-x-2 text-sm text-gray-800">
                                            <span className="text-purple-600">
                                                {appointment.meeting_link ? (
                                                    <Link target="_blank" to={appointment.meeting_link} className="btn btn-xs">
                                                        Meet
                                                    </Link>
                                                ) : (
                                                    <span className="btn btn-xs disabled">No Meeting Link</span>
                                                )}
                                            </span>
                                            <span>{appointment.patient_name}</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {appointment.reason}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {`${appointment.appointment_date} ${appointment.appointment_time}`}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${appointment.status === "Pending"
                                                    ? "text-pink-700 bg-pink-100"
                                                    : appointment.status === "Confirmed"
                                                        ? "text-green-700 bg-green-100"
                                                        : "text-gray-700 bg-gray-100"
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                className={`btn btn-xs mx-1 ${appointment.status === "Completed" ? "btn-success" : "btn-warning"
                                                    }`}
                                            >
                                                {appointment.status === "Completed" ? "Completed" : "Complete"}
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
