import { createBrowserRouter } from "react-router";
import RootLayout from "../Root/RootLayout";
import Home from "../home/Home";
import Error from "../pages/error/Error";
import SignUp from "../pages/signUP/SignUp";
import SignIn from "../pages/signIN/SignIn";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contactUs/ContactUs";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error></Error>,
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contact-Us",
                element: <ContactUs></ContactUs>
            },
        ]
    },
]);