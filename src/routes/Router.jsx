import { createBrowserRouter } from "react-router";
import RootLayout from "../Root/RootLayout";
import Home from "../home/Home.jsx";
import Error from "../pages/error/Error";
import SignUp from "../pages/signUP/SignUp";
import SignIn from "../pages/signIN/SignIn";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contactUs/ContactUs";
import AvailableCamps from "../pages/camps/AvailableCamps";
import CampDetails from "../pages/camps/CampDetails";
import Payments from "../pages/payments/Payments";
// Dashboard
// Organizer pages
import OrganizerProfile from "../pages/dashboard/organizer/OrganizerProfile";
import AddCamp from "../pages/dashboard/organizer/AddCamp";
import ManageCamps from "../pages/dashboard/organizer/ManageCamps";
import UpdateCamp from "../pages/dashboard/organizer/UpdateCamp";
import ManageRegisteredCamps from "../pages/dashboard/organizer/ManageRegisteredCamps";

// Participant pages
import ParticipantProfile from "../pages/dashboard/participant/ParticipantProfile";
import Analytics from "../pages/dashboard/participant/Analytics";
import RegisteredCamps from "../pages/dashboard/participant/RegisteredCamps";
import PaymentHistory from "../pages/dashboard/participant/PaymentHistory";

import PrivateRoute from './PrivateRoute.jsx';
import DashboardWrapper from "../layouts/DashboardWrapper.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/signin", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/about-us", element: <AboutUs /> },
            { path: "/contact-us", element: <ContactUs /> },
            { path: "/available-camps", element: <AvailableCamps /> },
            {
                path: "/camp-details/:id",
                element: (
                    <PrivateRoute>
                        <CampDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "/payment/:id",
                element: (
                    <PrivateRoute>
                        <Payments />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
              <DashboardWrapper></DashboardWrapper>
            </PrivateRoute>
        ),
        children: [
            // Default dashboard page
           
            // Organizer routes
            { path: "organizer-profile", element: <OrganizerProfile /> },
            { path: "add-camp", element: <AddCamp /> },
            { path: "manage-camps", element: <ManageCamps /> },
            { path: "update-camp/:campId", element: <UpdateCamp /> },
            { path: "manage-registered-camps", element: <ManageRegisteredCamps /> },

            // Participant routes
            { path: "profile", element: <ParticipantProfile /> },
            { path: "analytics", element: <Analytics /> },
            { path: "registered-camps", element: <RegisteredCamps /> },
            { path: "payment-history", element: <PaymentHistory /> },
        ],
    },

    { path: "*", element: <Error /> },
]);
