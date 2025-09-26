import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner (2).jpg';
import banner3 from '../../assets/banner (3).jpg';

const Banner = () => {
    const slides = [
        {
            image: banner1,
            title: "Welcome to Our Platform",
            subtitle: "Your Gateway to Premium Services",
            caption: "Explore a wide range of solutions designed to simplify your life, enhance productivity, and bring you closer to your goals.",
        },
        {
            image: banner2,
            title: "Discover New Opportunities",
            subtitle: "Unlock Your Full Potential",
            caption: "Connect with experts, learn new skills, and access resources that help you grow personally and professionally every day.",
        },
        {
            image: banner3,
            title: "Join Our Vibrant Community",
            subtitle: "Collaborate, Share, and Inspire",
            caption: "Become part of a supportive network where ideas flourish, partnerships form, and every member contributes to collective success.",
        },
    ];


    return (
        <div className="w-full relative">
            <Carousel autoplay>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[500px]">
                        {/* Image */}
                        <img src={slide.image} alt={`slide-${index}`} className="w-full h-full object-cover rounded-2xl" />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>

                        {/* Text */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 md:p-16 text-white z-10">
                            <h1 className="text-3xl md:text-5xl font-bold mb-2 inter-font">{slide.title}</h1>
                            <h3 className="text-xl md:text-2xl mb-4">{slide.subtitle}</h3>
                            <p className="text-md md:text-lg">{slide.caption}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
