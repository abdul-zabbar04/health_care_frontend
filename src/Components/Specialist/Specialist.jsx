import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from "../../assets/Specialties_image/cardiology.png"; // Default image
import DoctorsView from "../Doctors_views/Doctors_view";

const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [specialization_id, setSpecialization_id] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for large screens

  useEffect(() => {
    // Fetch data from API
    axios
      .get("https://health-care-nine-indol.vercel.app/api/filter/specialization/")
      .then((response) => setSpecialists(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    updateItemsPerPage(); // Set initially
    window.addEventListener("resize", updateItemsPerPage); // Listen for screen resize
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Carousel functions
  const nextSlide = () => {
    if (currentIndex + itemsPerPage < specialists.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40">
        <div className="text-center my-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
            Specialities
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 mt-2">
            Consult with top doctors across specialities
          </p>
        </div>

        {/* Container: Ensures full visibility on all screens */}
        <div className="flex gap-5 overflow-x-auto md:overflow-hidden">
          {specialists
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((specialist) => (
              <div
                key={specialist.id}
                className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700 flex-shrink-0"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={defaultImage} // Default image for all specialists
                    alt={specialist.name}
                    className="w-20 h-20"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg">{specialist.name}</h2>
                  <div className="card-actions">
                    <button onClick={() => setSpecialization_id(specialist.id)} className="btn btn-primary btn-sm">Filter</button>
                    <button onClick={() => setSpecialization_id(null)} className="btn btn-primary btn-sm">Reset Filter</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Carousel buttons */}
      <div className="flex justify-center mt-7">
        <div className="join">
          <button onClick={prevSlide} className="join-item btn btn">
            «
          </button>
          <button onClick={nextSlide} className="join-item btn btn">
            »
          </button>
        </div>
      </div>
      {<DoctorsView specialization_id={specialization_id}/>}
    </>
  );
};

export default Specialist;
