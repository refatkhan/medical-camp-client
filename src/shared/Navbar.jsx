// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { FaCampground, FaBars } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Links for middle section
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Available Camps", to: "/available-camps" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <FaCampground size={26} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none", fontWeight: 600 }}
          >
            MedCamp
          </Typography>
        </Box>

        {/* Middle links (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            gap: 3,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.name}
              component={Link}
              to={link.to}
              sx={{ color: "white", fontWeight: 500 }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!user ? (
            <Button
              component={Link}
              to="/signin"
              variant="contained"
              color="secondary"
            >
              Join Us
            </Button>
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
                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>

        {/* Hamburger menu for mobile */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "flex", lg: "none" } }}
          onClick={toggleDrawer}
        >
          <FaBars />
        </IconButton>

        {/* Drawer (mobile) */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
              {navLinks.map((link) => (
                <ListItem button key={link.name} component={Link} to={link.to}>
                  <ListItemText primary={link.name} />
                </ListItem>
              ))}
              {!user ? (
                <ListItem button component={Link} to="/signin">
                  <ListItemText primary="Join Us" />
                </ListItem>
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
