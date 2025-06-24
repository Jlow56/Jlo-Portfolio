import React from 'react';
// react router dom
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// pages public
import Portfolio from '../pages/Portfolio.jsx';
import ProjectDetails from '../pages/ProjectDetails.jsx';
import Error from '../pages/Error.jsx';
// // pages admin
// import Login from '../sections/Login.js';
// import Dashboard from '../sections/Dashboard.js';

// Layouts
import Header from '../layouts/Header.jsx';
import Main from '../layouts/Main.jsx';
import Footer from '../layouts/Footer.jsx/index.js';

function StaticLayout() {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />  
        </>
    );
}

const AppRouter = () => 
    (
        <BrowserRouter>
            <Routes>
                <Route element={<StaticLayout />}>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

export default AppRouter;