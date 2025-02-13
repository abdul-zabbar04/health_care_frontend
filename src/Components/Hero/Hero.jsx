import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-r from-blue-300 to-indigo-300 text-black">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-8 p-6">
        <img
          src="/heroSection.png"
          alt="Doctor with Patient"
          className="rounded-lg shadow-xl w-full lg:w-1/2"
        />
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold">Your Trusted Healthcare Companion</h1>
          <p className="py-4 text-lg">
            Find top doctors and book appointments effortlessly. Get the best medical care for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/guide" className="btn btn-primary">Get Guideline</Link>
            <Link to="/find-doctor" className="btn btn-outline text-white border-white">Find a Doctor</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
