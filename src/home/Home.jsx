import React from 'react';
import { DatePicker } from 'antd';
import Navbar from '../shared/Navbar';
import Banner from '../components/banner/Banner.jsx';
import MedicalCamp from '../components/medical-camp/MedicalCamp';
import HealthTips from '../components/Health/HealthTips';
import Feedback from '../components/feedback/Feedback';
const Home = () => {
    return (
        <div className='w-19/20 mx-auto '>
            <Banner/>
            <MedicalCamp></MedicalCamp>
            <HealthTips></HealthTips>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;