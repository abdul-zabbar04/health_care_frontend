import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import defaultImage from "../../assets/Specialties_image/cardiology.png";
import DoctorsView from "../Doctors_views/Doctors_view";

const SpecialistAndHealthConcern = () => {
  const [specialists, setSpecialists] = useState([]);
  const [specialization_id, setSpecialization_id] = useState(null);
  const [healthConcerns, setHealthConcerns] = useState([]);
  const [health_concern_id, setHealth_concern_id] = useState(null);
  const [lastUpdated, setLastUpdated] = useState({ name: null, id: null });

  useEffect(() => {
    axios.get("https://health-care-nine-indol.vercel.app/api/filter/specialization/")
      .then((response) => setSpecialists(response.data))
      .catch((error) => console.error("Error fetching specializations:", error));
  }, []);

  useEffect(() => {
    axios.get("https://health-care-nine-indol.vercel.app/api/filter/health_concern/")
      .then((response) => setHealthConcerns(response.data))
      .catch((error) => console.error("Error fetching health concerns:", error));
  }, []);

  useEffect(() => {
    if (specialization_id !== null) {
      setLastUpdated({ name: "specialization_id", id: specialization_id });
    }
  }, [specialization_id]);

  useEffect(() => {
    if (health_concern_id !== null) {
      setLastUpdated({ name: "health_concern_id", id: health_concern_id });
    }
  }, [health_concern_id]);

  return (
    <>
      {/* Specializations Swiper */}
      <div className="w-full px-[25px]">
        <div className="text-center my-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650">Specialities</h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 mt-2">Consult with top doctors across specialities</p>
        </div>

        <Swiper modules={[Navigation]} navigation spaceBetween={10} breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}>
          {specialists.map((specialist) => (
            <SwiperSlide key={specialist.id}>
              <div 
                className="p-2 bg-white shadow-md rounded-lg cursor-pointer text-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                onClick={() => setSpecialization_id(specialist.id)}
              >
                <img src={defaultImage} alt={specialist.name} className="w-12 h-12 mx-auto" />
                <h2 className="text-sm font-semibold mt-2">{specialist.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Health Concerns Swiper */}
      <div className="w-full px-[25px] mt-10">
        <div className="text-center my-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650">Common Health Concerns</h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-500 mt-2">Consult a doctor online for any health issue</p>
        </div>

        <Swiper modules={[Navigation]} navigation spaceBetween={10} breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}>
          {healthConcerns.map((concern) => (
            <SwiperSlide key={concern.id}>
              <div 
                className="p-2 bg-white shadow-md rounded-lg cursor-pointer text-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                onClick={() => setHealth_concern_id(concern.id)}
              >
                <img src={concern.image || defaultImage} alt={concern.name} className="w-12 h-12 mx-auto" />
                <h2 className="text-sm font-semibold mt-2">{concern.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Doctors View */}
      {lastUpdated.name === "specialization_id" ? (
        <DoctorsView specialization_id={lastUpdated.id} />
      ) : lastUpdated.name === "health_concern_id" ? (
        <DoctorsView health_concern_id={lastUpdated.id} />
      ) : (
        <DoctorsView />
      )}
    </>
  );
};

export default SpecialistAndHealthConcern;
