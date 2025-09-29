import React, { useState } from "react";
import { Outlet, Link } from "react-router";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  CssBaseline,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoArrowBack } from "react-icons/io5";

const drawerWidth = 240;

const ParticipantDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(180deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
      }}
    >
      <Toolbar />
      <List>
        {[
          { text: "Analytics", path: "analytics" },
          { text: "Profile", path: "profile" },
          { text: "Registered Camps", path: "registered-camps" },
          { text: "Payment History", path: "payment-history" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                  transform: "translateX(5px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Participant Dashboard
            </Typography>
          </Box>

          {/* Back to Home Button */}
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<IoArrowBack />}  // <-- replace with any icon from react-icons
            sx={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // match dashboard AppBar bg
              color: "#fff", // text color
              "&:hover": { background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)" }, // hover effect
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(180deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(180deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ParticipantDashboard;
