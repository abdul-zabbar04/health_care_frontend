import React from 'react';
import Hero from '../../Components/Hero/Hero'
import CommonHealthConcern from '../../Components/Categories/CommonHealthConcern'
import Specialist from '../../Components/Specialist/Specialist'
import Doctors_view from '../../Components/Doctors_views/Doctors_view'
import StepsGuide from '../../Components/StepGuide/StepsGuide'

const Home = () => {
    return (
        <div>
            <Hero></Hero> 
            <CommonHealthConcern></CommonHealthConcern>
            <Specialist></Specialist>
            <Doctors_view></Doctors_view>
            <StepsGuide></StepsGuide>
        </div>
    );
};

export default Home;