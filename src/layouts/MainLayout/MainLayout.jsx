import React from 'react';
import NavBar from '../../pages/Shared/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../pages/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <h2>hello from main layout</h2>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;