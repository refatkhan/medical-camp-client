import React from 'react';
import { DatePicker } from 'antd';
import Navbar from '../shared/Navbar';
import Banner from '../components/banner/Banner.jsx';
import MedicalCamp from '../components/medical-camp/MedicalCamp';
import HealthTips from '../components/Health/HealthTips';
import Feedback from '../components/feedback/Feedback';
import Partners from '../pages/sponsor/Partners.jsx';
import FAQ from '../pages/FAQ/FAQ.jsx';
import FeaturedDoctors from '../components/featured-doctor/FeaturedDoctors .jsx';
import ActiveCampsMap from '../components/ActiveCamps/ActiveCampsMap.jsx';
const Home = () => {
    return (
        <div className='w-19/20 mx-auto '>
            <Banner />
            <MedicalCamp></MedicalCamp>
            <FeaturedDoctors></FeaturedDoctors>
            <HealthTips></HealthTips>
            <Feedback></Feedback>
            <FAQ></FAQ>
            <ActiveCampsMap></ActiveCampsMap>
            <Partners></Partners>
        </div>
    );
};

export default Home;