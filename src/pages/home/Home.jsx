import React from 'react';
import Hero from '../../Components/Hero/Hero'
import CommonHealthConcern from '../../Components/Categories/CommonHealthConcern'
import Specialist from '../../Components/Specialist/Specialist'
import Doctors_view from '../../Components/Doctors_views/Doctors_view'
import StepsGuide from '../../Components/StepGuide/StepsGuide'
import SpecialistAndHealthConcern from '../../Components/Categories/CommonHealthConcern';
import Carousel from '../../Components/Carousel/Carousel';
import Newsletter from '../../Components/Footer/Newsletter';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            {/* <Carousel></Carousel> */}
            {/* <CommonHealthConcern></CommonHealthConcern>
            <Specialist></Specialist> */}
            <SpecialistAndHealthConcern/>
            {/* <Doctors_view></Doctors_view> */}
            <StepsGuide></StepsGuide>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;