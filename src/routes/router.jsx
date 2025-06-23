import React from 'react';
// react router dom
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// pages public
import Portfolio from '../pages/Portfolio';
import Projects from '../pages/Projects';
import About from '../pages/About';
import Error from '../pages/Error';
// pages admin
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
// Layouts
import Header from '../layouts/Header';
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
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/projects/:id" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

export default AppRouter;