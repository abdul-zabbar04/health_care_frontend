import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router';  // Import useNavigate
import { useForm } from "react-hook-form";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();  // Initialize the navigate function
    const [loading, setLoading] = useState(false);  // Loading state

    const {
        register,  // Register inputs to react-hook-form
        handleSubmit,  // Handles form submission
        setValue, // for auto login
        formState: { errors },  // Holds validation errors
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Set loading state to true on submit
        try {
            const response = await axios.post(
                "https://health-care-nine-indol.vercel.app/api/auth/login/",
                data
            );
            // **Save the token in local storage**
            const authToken = response.data.key;
            localStorage.setItem("authToken", response.data.key); // Adjust the key if your API uses a different name
            const userResponse = await axios.get("https://health-care-nine-indol.vercel.app/api/auth/user/", {
                headers: { Authorization: `Token ${authToken}` },
            });

            const userRole = userResponse.data.role; // Extract role from user data
            console.log(userRole);
            localStorage.setItem("userRole", userRole);
            alert("Login successful!");
            console.log(response.data);
            // **Redirect to the dashboard**
            navigate('/dashboard');  // Redirect to the dashboard page
        } catch (error) {
            console.error("Full Error:", error); // Log full error
            console.error("Error Response Data:", error.response?.data); // Log API error details
            alert(
                error.response?.data?.detail ||
                "An error occurred during login. Please try again."
            );
        }finally {
            setLoading(false); // Reset loading state after submission
        }
    };

    // Autofill demo credentials
    const fillDemoCredentials = (role) => {
        if (role === "doctor") {
            setValue("email", "abdul.zabbar00019@gmail.com");
            setValue("password", "12345Mac");
        } else if (role === "patient") {
            setValue("email", "abdul.zabbar00020@gmail.com");
            setValue("password", "12345Mac");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                            <button 
                                type="button" 
                                className="btn btn-xs btn-primary" 
                                onClick={() => fillDemoCredentials("doctor")}
                            >
                                Demo Doctor
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-xs btn-primary mx-2" 
                                onClick={() => fillDemoCredentials("patient")}
                            >
                                Demo Patient
                            </button>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative">
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter a valid email address",
                                                },
                                            })}
                                            autoComplete="on"
                                            id="email"
                                            name="email"
                                            type="text"
                                            className="mb-5 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Email address"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                    </div>
                                    <div className="relative">
                                        <input
                                            {...register("password", { required: "Password is required" })}
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="mb-5 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Password"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                                    </div>
                                    <div className="relative">
                                    <button 
                                            type="submit" 
                                            className="bg-cyan-500 text-white rounded-md px-2 py-1"
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? "Logging in..." : "Login"}
                                        </button>
                                    </div>
                                    <Link
                                        to="/password/reset"
                                        className="text-sm font-light text-gray-500 dark:text-gray-400"
                                    >
                                        Forget Password
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Sign up here
                        </Link>
                    </p>
                    <Link to="/" className=''>Go back to Home Page</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
