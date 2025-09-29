// src/pages/SignUp.jsx
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // at top
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import welcome from "../../assets/Welcome (1).json";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../../provider/AuthProvider.jsx";
import useAxios from "../../hooks/useAxios.js";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const SignUp = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const password = watch("password");


    const handleSignUp = async (data) => {
        try {
            let photoURL = "";

            // Upload image if exists
            if (data.image) {
                const formData = new FormData();
                formData.append("image", data.image);
                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_KEY}`,
                    { method: "POST", body: formData }
                );
                const result = await res.json();
                photoURL = result.data.url;
            }

            // Create user in Firebase
            const userCredential = await createUser(data.email, data.password);
            const firebaseUser = userCredential.user;

            // Update Firebase profile
            await updateUserProfile(data.name, photoURL, firebaseUser);

            // Send user info to backend
            await axiosInstance.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password,
                image: photoURL,
            });

            // Get JWT token from backend
            const tokenResponse = await axiosInstance.post("/jwt", { email: data.email });
            if (tokenResponse?.data?.token) {
                localStorage.setItem("access-token", tokenResponse.data.token);
            } else {
                throw new Error("Failed to receive token from backend");
            }

            // Reset form, alert, redirect
            reset();
            alert("User registered successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || err.message);
        }
    };


   const handleGoogleSignIn = async () => {
    try {
        const result = await googleSignIn();
        const firebaseUser = result.user;
        if (!firebaseUser?.email) throw new Error("No email returned from Google Sign-In");

        // Send user info to backend
        await axiosInstance.post("/users", {
            name: firebaseUser.displayName || "Google User",
            email: firebaseUser.email,
            password: "GoogleAuth", // placeholder
            image: firebaseUser.photoURL || "",
        });

        // Get JWT token from backend
        const tokenResponse = await axiosInstance.post("/jwt", { email: firebaseUser.email });
        if (tokenResponse?.data?.token) {
            localStorage.setItem("access-token", tokenResponse.data.token);
        } else {
            throw new Error("Failed to receive token from backend");
        }

        alert("Signed in with Google successfully!");
        navigate("/");
    } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || err.message);
    }
};


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 2,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: "100%", maxWidth: 900 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        bgcolor: "white",
                        borderRadius: 4,
                        boxShadow: 6,
                        overflow: "hidden",
                    }}
                >
                    {/* Left side - Animation */}
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "#f9f9f9",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: { xs: 3, md: 4 },
                        }}
                    >
                        <Lottie
                            animationData={welcome}
                            loop={true}
                            style={{ width: "80%", maxWidth: 350 }}
                        />
                    </Box>

                    {/* Right side - Form */}
                    <Box sx={{ flex: 1.2, p: { xs: 3, md: 5 } }}>
                        <Typography
                            variant="h5"
                            align="center"
                            fontWeight="bold"
                            gutterBottom
                            color="primary"
                        >
                            Create an Account
                        </Typography>

                        <form onSubmit={handleSubmit(handleSignUp)}>
                            {/* Name */}
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Name is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            {/* Email */}
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />

                            {/* Password */}
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />

                            {/* Confirm Password */}
                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Re-type Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                )}
                            />

                            {/* Image Upload */}
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Image
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => field.onChange(e.target.files[0])}
                                            />
                                        </Button>
                                        <Typography variant="body2">
                                            {field.value ? field.value.name : "No file selected"}
                                        </Typography>
                                    </Stack>
                                )}
                            />

                            {/* Sign Up Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                            >
                                Sign Up
                            </Button>
                        </form>

                        <Divider sx={{ my: 3 }}>OR</Divider>

                        {/* Google Sign In */}
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleSignIn}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default SignUp;
