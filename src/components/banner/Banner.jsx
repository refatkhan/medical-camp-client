import React, { useState } from "react";
import { Box, Typography, MobileStepper, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import banner3 from '../../assets/banner-3.jpg';

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

const Banner = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prev) => (prev + 1) % slides.length);
    };

    const handleBack = () => {
        setActiveStep((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <Box sx={{ width: "100%", position: "relative", borderRadius: 3, overflow: "hidden" }}>
            <SwipeableViews
                index={activeStep}
                onChangeIndex={setActiveStep}
                enableMouseEvents
                resistance
                style={{ height: "500px" }}
            >
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "500px",
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Gradient Overlay */}
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
                            }}
                        />

                        {/* Text */}
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                textAlign: "center",
                                px: 3,
                            }}
                        >
                            <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
                                {slide.title}
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 3 }}>
                                {slide.subtitle}
                            </Typography>
                            <Typography variant="body1" sx={{ maxWidth: 600 }}>
                                {slide.caption}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </SwipeableViews>

            {/* Mobile Stepper */}
            <MobileStepper
                steps={slides.length}
                position="static"
                activeStep={activeStep}
                sx={{
                    background: "transparent",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 20,
                    width: "100%",
                }}
                nextButton={
                    <Button size="small" onClick={handleNext} sx={{ color: "white" }}>
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} sx={{ color: "white" }}>
                        <KeyboardArrowLeft />
                    </Button>
                }
            />
        </Box>
    );
};

export default Banner;
