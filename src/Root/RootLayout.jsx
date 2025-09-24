import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
            
        </div>
    );
};

export default RootLayout;