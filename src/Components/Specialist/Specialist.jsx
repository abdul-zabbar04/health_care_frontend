import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from "../../assets/Specialties_image/cardiology.png";

const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for large screens

  useEffect(() => {
    axios
      .get("https://health-care-nine-indol.vercel.app/api/filter/specialization/")
      .then((response) => setSpecialists(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(4); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < specialists.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="w-full px-[25px] relative">
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold text-gray-700">Specialities</h1>
        <p className="text-lg text-gray-500 mt-2">
          Consult with top doctors across specialities
        </p>
      </div>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md">
          ❮
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-hidden w-full">
          {specialists.slice(currentIndex, currentIndex + itemsPerPage).map((specialist) => (
            <div key={specialist.id} className="bg-white shadow-lg border border-gray-200 rounded-lg p-4 text-center">
              <img src={defaultImage} alt={specialist.name} className="w-20 h-20 mx-auto" />
              <h2 className="text-lg font-semibold mt-2">{specialist.name}</h2>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Specialist;
