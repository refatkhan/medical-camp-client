import { createBrowserRouter } from "react-router";
import RootLayout from "../Root/RootLayout";
import Home from "../home/Home";
import Error from "../pages/error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error></Error>,
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    },
]);