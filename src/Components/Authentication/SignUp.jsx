import React from "react";
import { Link, useNavigate} from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const navigate= useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password1 = watch("password1");
  // const role = watch("role");
  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://health-care-nine-indol.vercel.app/api/auth/registration/",
        data
      );
      alert("Registration successful! Check your Email to verify");
      // console.log(role, "this is role");
      // if(role==='patient'){
      //   navigate('/patient-register');
      // }
      // if(role==='doctor'){
      //   navigate('/contact-us');
      // }
    } catch (error) {
      console.error(error.response?.data || "Something went wrong");
      alert(
        error.response?.data?.detail ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-16">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username cannot exceed 20 characters",
                    },
                  })}
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-2">{errors.username.message}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
                {errors.role && (
                  <p className="text-sm text-red-500 mt-2">{errors.role.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  {...register("password1", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  id="password1"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                {errors.password1 && (
                  <p className="text-sm text-red-500 mt-2">{errors.password1.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  {...register("password2", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password1 || "Passwords do not match",
                  })}
                  type="password"
                  id="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                {errors.password2 && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.password2.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  {...register("terms", { required: "You must accept the terms" })}
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-900 dark:text-white">
                  I accept the{" "}
                  {/* <a href="#" className="font-medium text-primary-600 hover:underline">
                    
                  </a> */}
                  <label className="cursor-pointer font-medium text-primary-600 hover:underline" htmlFor="my_modal_6">Terms and Conditions</label>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 mt-2">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
              >
                Submit
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
            <Link to="/" className=''>Go back to Home Page</Link>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Hello!</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
    </section>
  );
};

export default SignUp;
