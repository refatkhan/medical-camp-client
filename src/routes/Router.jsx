import { createBrowserRouter } from "react-router";
import RootLayout from "../Root/RootLayout";
import Home from "../home/Home";
import Error from "../pages/error/Error";
import SignUp from "../pages/signUP/SignUp";
import SignIn from "../pages/signIN/SignIn";

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
            }
        ]
    },
]);