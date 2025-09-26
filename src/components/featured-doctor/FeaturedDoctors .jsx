// src/components/FeaturedDoctors.jsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Pagination,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import doctors from "../../assets/doctors.json"; // updated import

const FeaturedDoctors = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

    // Determine doctors per page based on screen
    const doctorsPerPage = isXs ? 1 : isSm ? 2 : 4;

    const [page, setPage] = useState(1);

    // Slice doctors array for current page
    const startIndex = (page - 1) * doctorsPerPage;
    const endIndex = startIndex + doctorsPerPage;
    const paginatedDoctors = doctors.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ py: { xs: 8, sm: 12 }, px: { xs: 2, sm: 6 }, bgcolor: "gray.50" }}>
            <Typography variant="h4" align="center" fontWeight="bold" color="green" mb={2}>
                Featured Doctors
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" mb={6}>
                Meet our experienced and trusted medical specialists
            </Typography>

            {/* Horizontal Flex Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap", // wrap on larger screens
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                {paginatedDoctors.map((doctor, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: { xs: "80%", sm: "45%", md: "22%" }, // responsive width
                            minWidth: 200,
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "all 0.3s",
                            "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="180"
                            image={doctor.photo}
                            alt={doctor.name}
                        />
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                {doctor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                {doctor.specialty} • {doctor.experience} experience
                            </Typography>
                            <Rating value={doctor.rating} precision={0.1} readOnly />
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Pagination */}
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(doctors.length / doctorsPerPage)}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default FeaturedDoctors;
