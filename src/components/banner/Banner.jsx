import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";

const slides = [banner1, banner2, banner3];

const Banner = () => {
    return (
        <Box sx={{ width: "100%", height: "500px", borderRadius: 3, overflow: "hidden" }}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                style={{ height: "100%" }}
            >
                {slides.map((image, i) => (
                    <SwiperSlide key={i}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "500px",
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default Banner;
