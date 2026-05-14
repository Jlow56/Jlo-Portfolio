import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// pages
import PortfolioPage from '../pages/public/Portfolio.jsx';
import ProjectDetails from '../pages/public/ProjectDetails.jsx';
import ErrorPage from '../pages/public/Error.jsx';
import MerciPage from '../pages/public/Merci.jsx';
// layouts
import Header from '../layouts/Header';
import Main from '../layouts/Main';
import Footer from '../layouts/Footer';

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
                <Route path ="/" element={<StaticLayout/>}>
                    <Route index element={<PortfolioPage/>} />
                    <Route path="/project/:slug" element={<ProjectDetails />} />
                    <Route path="*" element={<ErrorPage/>} />
                    <Route path="merci" element={<MerciPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

export default AppRouter;
