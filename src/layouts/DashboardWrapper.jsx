// DashboardWrapper.jsx
import React from "react";
import { Navigate } from "react-router";
import ParticipantDashboard from "./ParticipantDashboard";
import OrganizerDashboard from "./OrganizerDashboard";
import useUserRole from "../hooks/useUserRole";

const DashboardWrapper = () => {
    const { role, roleLoading } = useUserRole(); // role comes from your DB

    if (roleLoading) return <p>Loading...</p>; // show a spinner if needed

    if (!role) return <Navigate to="/sign-in" replace />; // not logged in

    // Render dashboard based on role
    if (role === "participant" || role === "user") {
        return <ParticipantDashboard />;
    } else if (role === "organizer") {
        return <OrganizerDashboard />;
    } else {
        return <p>Access denied</p>; // fallback for unknown roles
    }
};

export default DashboardWrapper;
