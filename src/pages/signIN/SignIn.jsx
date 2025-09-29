// src/pages/SignIn.jsx
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider.jsx";
import useAxios from "../../hooks/useAxios.js";
import loginAnim from "../../assets/Login Leady"; // use your own Lottie file
import {
    Button,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignIn = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            // Send user info to backend
            await axiosInstance.post("/users", {
                name: user.displayName || "Google User",
                email: user.email,
                password: "GoogleAuth", // placeholder
                image: user.photoURL || "",
            });

            alert("Signed in with Google successfully!");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || err.message);
        }
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        // TODO: integrate with Firebase Auth or backend login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden"
            >
                {/* Left: Lottie */}
                <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-gradient-to-br from-purple-600 to-pink-600">
                    <Lottie animationData={loginAnim} loop={true} className="w-64 md:w-80" />
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Sign in to continue managing your account
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                )}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    {/* Extra Links */}
                    <p className="text-center text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-purple-600 font-semibold">
                            Sign Up
                        </a>
                    </p>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;
