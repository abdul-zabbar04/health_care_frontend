import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="hero mt-[3rem] h-auto py-8 bg-gradient-to-r from-blue-300 to-indigo-300 text-black flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full px-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/heroSection.png"
            alt="Doctor with Patient"
            className="rounded-lg shadow-xl w-[80%] sm:w-[70%] md:w-[60%] lg:w-1/2 max-w-[350px] sm:max-w-[400px] mx-auto"
          />
        </div>

        {/* Text & Buttons Section */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Your Trusted Healthcare Companion
          </h1>
          <p className="py-3 text-sm sm:text-base md:text-lg">
            Find top doctors and book appointments effortlessly. Get the best medical care for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link to="/guide" className="btn btn-primary text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
              Get Guideline
            </Link>
            <Link to="/find-doctor" className="btn btn-outline text-white border-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
              Find a Doctor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
