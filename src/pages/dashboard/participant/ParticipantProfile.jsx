// src/pages/profile/ParticipantProfile.jsx
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    Avatar,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Fade,
    CircularProgress,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ParticipantProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, setUser, updateUserProfile } = useAuth();

    const [open, setOpen] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        avatar: "",
    });

    // Fetch profile from backend on mount
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email) return;
            try {
                setLoadingProfile(true);
                const res = await axiosSecure.get("/profile"); // JWT identifies user
                const profile = res.data;

                setFormData({
                    name: profile.name || "",
                    email: profile.email || "",
                    contact: profile.contact || "",
                    avatar: profile.avatar || profile.photoURL || profile.image || "",
                });

                // Merge backend profile into context
                setUser(prev => ({ ...prev, ...profile }));
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [user?.email]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Upload avatar
    const handleAvatarChange = async e => {
        const file = e.target.files[0];
        if (!file) return;

        setLoadingAvatar(true);
        const formDataImg = new FormData();
        formDataImg.append("image", file);

        try {
            const apiKey = import.meta.env.VITE_APP_IMGBB_KEY;
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formDataImg,
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, avatar: data.data.url }));
            } else {
                console.error("ImageBB response:", data);
            }
        } catch (err) {
            console.error("Image upload error:", err);
            alert("Error uploading avatar");
        } finally {
            setLoadingAvatar(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const { name, avatar, contact } = formData;

            // Update Firebase if name/avatar changed
            if ((user.displayName !== name || user.photoURL !== avatar) && updateUserProfile) {
                await updateUserProfile(name, avatar, user);
            }

            // Update backend
            const payload = { name, contact };
            if (avatar) payload.avatar = avatar;

            const res = await axiosSecure.patch("/update-profile", payload);
            const updatedUser = res.data.user;

            // Merge updated user into context
            setUser(prev => ({ ...prev, ...updatedUser }));
            setFormData({
                name: updatedUser.name || "",
                email: updatedUser.email || "",
                contact: updatedUser.contact || "",
                avatar: updatedUser.avatar || updatedUser.photoURL || "",
            });

            alert(res.data.message || "Profile updated successfully!");
        } catch (err) {
            console.error(err);
        } finally {
            setOpen(false);
        }
    };

    if (loadingProfile) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                p: 3,
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.5s ease",
            }}
        >
            <Fade in>
                <Card
                    sx={{
                        maxWidth: 450,
                        width: "100%",
                        p: 4,
                        borderRadius: 3,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255, 255, 255, 0.85)",
                        transition: "all 0.5s ease",
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        <Avatar
                            src={formData.avatar || "/default-avatar.png"}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h6">{formData.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Contact: {formData.contact || "Not Provided"}
                            </Typography>
                            <Typography variant="body1">{formData.email}</Typography>
                        </Stack>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpen(true)}>
                            Update
                        </Button>
                    </Stack>
                </Card>
            </Fade>

            {/* Update Profile Modal */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                            <Avatar
                                src={formData.avatar || user.avatar || user.photoURL || "/default-avatar.png"}
                                sx={{ width: 100, height: 100 }}
                            />
                            {loadingAvatar && (
                                <CircularProgress
                                    size={100}
                                    sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                                />
                            )}
                        </Box>

                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField label="Email" name="email" value={formData.email} fullWidth disabled />
                        <TextField
                            label="Contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button variant="outlined" component="label">
                            Upload Avatar
                            <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdate}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ParticipantProfile;
