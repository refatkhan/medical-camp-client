// src/components/Partners.jsx
import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const partners = [
    { name: "City Hospital", icon: <LocalHospitalIcon fontSize="large" />, color: "linear-gradient(135deg, #6EE7B7, #3B82F6)" },
    { name: "Health NGO", icon: <HealthAndSafetyIcon fontSize="large" />, color: "linear-gradient(135deg, #FDE68A, #F59E0B)" },
    { name: "Medical Supplies Co.", icon: <MedicalServicesIcon fontSize="large" />, color: "linear-gradient(135deg, #FBCFE8, #EC4899)" },
    { name: "Wellness Foundation", icon: <FavoriteIcon fontSize="large" />, color: "linear-gradient(135deg, #A5B4FC, #4338CA)" },
    { name: "Care Clinics", icon: <EmojiPeopleIcon fontSize="large" />, color: "linear-gradient(135deg, #FCA5A5, #B91C1C)" },
];

const Partners = () => {
    return (
        <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200">
            <Box
                sx={{
                    py: { xs: 6, sm: 8, md: 10 },
                    px: { xs: 2, sm: 4, md: 8 },
                    bgcolor: 'linear-gradient(135deg, #E0F7FA, #FFFFFF)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    color="green"
                    mb={{ xs: 4, sm: 6 }}
                >
                    Our Partners & Sponsors
                </Typography>

                <Grid
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                    {partners.map((partner, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: { xs: '0 0 100%', sm: '0 0 48%', md: '0 0 30%', lg: '0 0 18%' },
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    py: { xs: 3, sm: 4 },
                                    px: { xs: 2, sm: 3 },
                                    textAlign: 'center',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: { xs: 64, sm: 80 },
                                        height: { xs: 64, sm: 80 },
                                        mx: 'auto',
                                        mb: { xs: 2, sm: 3 },
                                        background: partner.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {partner.icon}
                                </Avatar>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        color="text.primary"
                                        sx={{ fontSize: { xs: 14, sm: 16 } }}
                                    >
                                        {partner.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Partners;
