import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileCompleted, setProfileCompleted] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [userType, setUserType] = useState(null);
    const authToken = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(true)

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
                setLoading(false)

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

    return userType === "patient" ? <PatientDashboard appointments={appointments} loading={loading} /> : <DoctorDashboard appointments={appointments} loading={loading} />;
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

const PatientDashboard = ({ appointments, loading }) => {
    const authToken = localStorage.getItem("authToken");
    // const { appointment_id } = useParams();
    const x = 0
    const DeleteAppointment = async (appointmentId) => {
        try {
            const response = await axios.delete(
                `https://health-care-nine-indol.vercel.app/api/doctor/appointments/${appointmentId}/`,
                {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                }
            );
            console.log('Appointment deleted:', response.data);
            alert("Appointment Deleted! Reload the page to update dashboard.")
        } catch (error) {
            console.error('Error completing the appointment:', error);
        }
    };
    return (
        <div className="text-center">
            <div className="text-center">
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
                            {loading ? (
                                <div className="flex justify-center p-5 w-full">
                                    <span className="loading loading-bars loading-xs"></span>
                                </div>


                            ) :
                                appointments.length === 0 ? (
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
                                                        appointment.status === "Confirmed" ? (
                                                            <Link target="_blank" to={appointment.meeting_link} className="btn btn-xs">
                                                                Meet
                                                            </Link>
                                                        ) : appointment.status === "Completed" ? (
                                                            <Link to={`/review/create/${appointment.doctor}/${appointment.patient}`} className="btn btn-xs">Review</Link>
                                                        ) : null
                                                    ) : (
                                                        <span className="btn btn-xs disabled">Payment to get meet</span>
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
                                                    <button
                                                        className="btn btn-xs mx-1 btn-warning"
                                                        onClick={() => DeleteAppointment(appointment.id)}  // Call the completeAppointment function
                                                    >
                                                        Delete
                                                    </button>
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


import { FaUserMd, FaCalendarCheck, FaMoneyBill, FaStar, FaCommentsDollar, FaClipboardList } from "react-icons/fa";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL1 = "https://health-care-nine-indol.vercel.app/api/account/doctor-profile/";

const formatData = (apiData, key) => {
    return apiData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        [key]: item[key],
    }));
};

const DoctorDashboard = ({ appointments, loading }) => {
    const [doctorId, setDoctorId] = useState(null);
    const [viewsData, setViewsData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState(false);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(API_URL1, {
                    headers: { Authorization: `Token ${authToken}`, "Content-Type": "application/json" }
                });
                setDoctorData(response.data);
                setDoctorId(response.data.id);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };
        fetchDoctorData();
    }, [authToken]);

    useEffect(() => {
        if (!doctorId) return;

        const API_URL2 = `https://health-care-nine-indol.vercel.app/api/account/doctor/profile-views/${doctorId}`;
        const API_URL3 = `https://health-care-nine-indol.vercel.app/api/account/doctor/incomes/${doctorId}`;

        const fetchProfileViews = async () => {
            try {
                const response = await axios.get(API_URL2);
                setViewsData(formatData(response.data, "views_count"));
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        const fetchIncomeData = async () => {
            try {
                const response = await axios.get(API_URL3);
                setIncomeData(formatData(response.data.income_stats, "income"));
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchProfileViews();
        fetchIncomeData();
    }, [doctorId]);

    const maxViews = Math.max(...viewsData.map((item) => item.views_count), 0);
    const yAxisTicks = maxViews >= 100 ? 10 : 5;
    const doctorStats = {
        profileViews: doctorData?.total_views || 0,
        totalAppointments: doctorData?.total_appointments || 0,
        totalIncome: doctorData?.total_earned || "0",
        CurrentBalance: doctorData?.total_earned || "0",
        totalComments: doctorData?.total_comments || "0",
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[ 
                    { icon: <FaUserMd />, label: "Profile Views", value: doctorStats.profileViews },
                    { icon: <FaCalendarCheck />, label: "Completed Appointments", value: doctorStats.totalAppointments },
                    { icon: <FaMoneyBill />, label: "Total Income", value: `৳ ${doctorStats.totalIncome}` },
                    { icon: <FaMoneyBill />, label: "Current Balance", value: `৳ ${doctorStats.CurrentBalance}` },
                    { icon: <FaCommentsDollar />, label: "Total Comments", value: doctorStats.totalComments },
                ].map((stat, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg p-4 flex items-center gap-4">
                        <div className="text-3xl">{stat.icon}</div>
                        <div>
                            <h3 className="text-lg font-semibold">{stat.label}</h3>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
                <a href="#manageAppointment"
                    className="card bg-white shadow-lg p-6 flex flex-col items-center justify-center text-center text-lg font-bold cursor-pointer gap-2">
                    <FaClipboardList className="text-3xl text-gray-700" />
                    <span>Manage Appointment</span>
                </a>
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Profile Views (Last 7 Days)</h2>
                    {error ? (
                        <p className="text-red-500">Failed to load data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={viewsData}>
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, maxViews + 10]} tickCount={yAxisTicks} />
                                <Tooltip />
                                <Bar dataKey="views_count" fill="#4F46E5" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Income (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={incomeData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="income" stroke="#E53E3E" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
                    <AppointmentManage appointments={appointments} loading={loading}></AppointmentManage>
        </div>
    );
};



const AppointmentManage = ({ appointments, loading }) => {
    const authToken = localStorage.getItem("authToken");
    // const { appointment_id } = useParams();
    console.log(appointments);
    const completeAppointment = async (appointmentId) => {
        try {
            const response = await axios.post(
                `https://health-care-nine-indol.vercel.app/api/doctor/appointments/doctor/${appointmentId}/`,
                {},
                {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                }
            );
            console.log('Appointment completed:', response.data);
            alert("Appointment Completed! Reload to update dashboard.")
            // You may want to update the state here to reflect the appointment status change
        } catch (error) {
            console.error('Error completing the appointment:', error);
        }
    };
    return (
        <div className="text-center my-10">
            <div className="text-center">
                <h5 id="manageAppointment" className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-650 leading-tight">
                    Your Appointments
                </h5>
            </div>

            <div className="mt-3">
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
                            {loading ? (
                                <div className="flex justify-center p-5 w-full">
                                    <span className="loading loading-bars loading-xs"></span>
                                </div>


                            ) :
                                appointments.length === 0 ? (
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
                                                    {appointment.status === "Confirmed" ? (
                                                        <Link target="_blank" to={appointment.meeting_link} className="btn btn-xs">
                                                            Meet
                                                        </Link>
                                                    ) : (
                                                        <span className="btn btn-xs disabled">Finished</span>
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
                                                {appointment.status !== "Completed" && (
                                                    <button
                                                        className="btn btn-xs mx-1 btn-warning"
                                                        onClick={() => completeAppointment(appointment.id)}  // Call the completeAppointment function
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                                {appointment.status == "Completed" && (
                                                    <button
                                                        className="btn btn-xs mx-1 btn-warning" disabled
                                                    >
                                                        Completed
                                                    </button>
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

export default Dashboard;
