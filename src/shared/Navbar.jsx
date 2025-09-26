// src/components/Navbar.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { FaCampground, FaBars } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Links to show
    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Available Camps", to: "/available-camps" },
    ];

    return (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left: Logo */}
                <Link to='/home'>
                    <Box display="flex" alignItems="center" gap={1}>
                        <FaCampground size={30} />
                        <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none" }}>
                            MedCamp
                        </Typography>
                    </Box>
                </Link>

                {/* Middle / Right */}
                <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 3 }}>
                    {navLinks.map((link) => (
                        <Button key={link.name} component={Link} to={link.to} sx={{ color: "white" }}>
                            {link.name}
                        </Button>
                    ))}

                    {!user ? (
                        <>
                            <Button component={Link} to="/signin" variant="contained" color="secondary">Sign In</Button>
                            <Button component={Link} to="/signup" variant="outlined" color="inherit">Sign Up</Button>
                        </>
                    ) : (
                        <>
                            <Avatar
                                src={user.photoURL || "/profile-placeholder.jpg"}
                                alt={user.displayName || "User"}
                                onClick={handleMenuOpen}
                                sx={{ cursor: "pointer" }}
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                <MenuItem disabled>{user.displayName || "User"}</MenuItem>
                                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>Dashboard</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
                {/* Hamburger for small devices */}
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: "flex", lg: "none" } }}
                    onClick={toggleDrawer}
                >
                    <FaBars />
                </IconButton>

                {/* Drawer for small screens */}
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
                        <List>
                            {navLinks.map((link) => (
                                <ListItem button key={link.name} component={Link} to={link.to}>
                                    <ListItemText primary={link.name} />
                                </ListItem>
                            ))}
                            {!user ? (
                                <>
                                    <ListItem button component={Link} to="/signin">
                                        <ListItemText primary="Sign In" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/signup">
                                        <ListItemText primary="Sign Up" />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem>
                                        <ListItemText primary={user.displayName || "User"} />
                                    </ListItem>
                                    <ListItem button component={Link} to="/dashboard">
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
