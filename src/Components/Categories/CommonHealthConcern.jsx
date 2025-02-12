import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from "../../assets/Specialties_image/cardiology.png"; // Default image
import DoctorsView from "../Doctors_views/Doctors_view";

const SpecialistAndHealthConcern = () => {
  // States for Specializations
  const [specialists, setSpecialists] = useState([]);
  const [specialization_id, setSpecialization_id] = useState(null);
  const [specializationCurrentIndex, setSpecializationCurrentIndex] = useState(0);
  const [specializationItemsPerPage, setSpecializationItemsPerPage] = useState(3);
  const [lastUpdated, setLastUpdated] = useState({ name: null, id: null });
  
  // States for Health Concerns
  const [healthConcerns, setHealthConcerns] = useState([]);
  const [health_concern_id, setHealth_concern_id] = useState(null);
  const [healthConcernCurrentIndex, setHealthConcernCurrentIndex] = useState(0);
  const [healthConcernItemsPerPage, setHealthConcernItemsPerPage] = useState(3);

  // Fetch data for specializations
  useEffect(() => {
    axios
      .get("https://health-care-nine-indol.vercel.app/api/filter/specialization/")
      .then((response) => setSpecialists(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fetch data for health concerns
  useEffect(() => {
    axios
      .get("https://health-care-nine-indol.vercel.app/api/filter/health_concern/")
      .then((response) => setHealthConcerns(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Update items per page based on screen size for Specializations
  useEffect(() => {
    const updateSpecializationItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setSpecializationItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setSpecializationItemsPerPage(2); // Tablet
      } else {
        setSpecializationItemsPerPage(3); // Desktop
      }
    };

    updateSpecializationItemsPerPage();
    window.addEventListener("resize", updateSpecializationItemsPerPage);
    return () => window.removeEventListener("resize", updateSpecializationItemsPerPage);
  }, []);

  // Update items per page based on screen size for Health Concerns
  useEffect(() => {
    const updateHealthConcernItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setHealthConcernItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setHealthConcernItemsPerPage(2); // Tablet
      } else {
        setHealthConcernItemsPerPage(3); // Desktop
      }
    };

    updateHealthConcernItemsPerPage();
    window.addEventListener("resize", updateHealthConcernItemsPerPage);
    return () => window.removeEventListener("resize", updateHealthConcernItemsPerPage);
  }, []);

  
// Track the most recent update for both specialization_id and health_concern_id

// Effect to track the most recent update for specialization_id
useEffect(() => {
  if (specialization_id !== null) {
    setLastUpdated({ name: "specialization_id", id: specialization_id });
  }
}, [specialization_id]);

// Effect to track the most recent update for health_concern_id
useEffect(() => {
  if (health_concern_id !== null) {
    setLastUpdated({ name: "health_concern_id", id: health_concern_id });
  }
}, [health_concern_id]);

// Display the most recent update
console.log("Last Updated:", lastUpdated);

  // Carousel functions for Specializations
  const nextSpecializationSlide = () => {
    if (specializationCurrentIndex + specializationItemsPerPage < specialists.length) {
      setSpecializationCurrentIndex(specializationCurrentIndex + 1);
    }
  };

  const prevSpecializationSlide = () => {
    if (specializationCurrentIndex > 0) {
      setSpecializationCurrentIndex(specializationCurrentIndex - 1);
    }
  };
  
  // Carousel functions for Health Concerns
  const nextHealthConcernSlide = () => {
    if (healthConcernCurrentIndex + healthConcernItemsPerPage < healthConcerns.length) {
      setHealthConcernCurrentIndex(healthConcernCurrentIndex + 1);
    }
  };

  const prevHealthConcernSlide = () => {
    if (healthConcernCurrentIndex > 0) {
      setHealthConcernCurrentIndex(healthConcernCurrentIndex - 1);
    }
  };
  
  return (
    <>
      {/* Specialization Section */}
      <div className="w-full px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40">
        <div className="text-center my-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
            Specialities
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 mt-2">
            Consult with top doctors across specialities
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto md:overflow-hidden">
          {specialists
            .slice(specializationCurrentIndex, specializationCurrentIndex + specializationItemsPerPage)
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
                    {/* <button onClick={() => setSpecialization_id(null)} className="btn btn-primary btn-sm">Reset Filter</button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Specialization Carousel buttons */}
        <div className="flex justify-center mt-7">
          <div className="join">
            <button onClick={prevSpecializationSlide} className="join-item btn btn">
              «
            </button>
            <button onClick={nextSpecializationSlide} className="join-item btn btn">
              »
            </button>
          </div>
        </div>
      </div>

      {/* Health Concern Section */}
      <div className="w-full px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-10">
        <div className="text-center my-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
            Common Health Concerns
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 mt-2">
            Consult a doctor online for any health issue
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto md:overflow-hidden">
          {healthConcerns
            .slice(healthConcernCurrentIndex, healthConcernCurrentIndex + healthConcernItemsPerPage)
            .map((concern) => (
              <div
                key={concern.id}
                className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700 flex-shrink-0"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={concern.image || defaultImage} // Use API image or default
                    alt={concern.name}
                    className="w-20 h-20"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg">{concern.name}</h2>
                  <div className="card-actions">
                    <button onClick={() => setHealth_concern_id(concern.id)} className="btn btn-primary btn-sm">Filter</button>
                    {/* <button onClick={() => setHealth_concern_id(null)} className="btn btn-primary btn-sm">Reset Filter</button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Health Concern Carousel buttons */}
        <div className="flex justify-center mt-7">
          <div className="join">
            <button onClick={prevHealthConcernSlide} className="join-item btn btn">
              «
            </button>
            <button onClick={nextHealthConcernSlide} className="join-item btn btn">
              »
            </button>
          </div>
        </div>
      </div>
      {
        lastUpdated.name === "specialization_id" ? <DoctorsView specialization_id={lastUpdated.id}/>
        : lastUpdated.name === "health_concern_id" ? <DoctorsView health_concern_id={lastUpdated.id}></DoctorsView>
        : <DoctorsView/>
      
      
      }
    </>
  );
};

export default SpecialistAndHealthConcern;
