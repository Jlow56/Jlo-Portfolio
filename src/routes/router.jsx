import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// pages 
import PortfolioPage from '../pages/Portfolio';
import ProjectDetailsPage from '../pages/ProjectDetails';
import ErrorPage from '../pages/Error';
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
                    <Route path="project/:id" element={<ProjectDetailsPage />} />
                    <Route path="*" element={<ErrorPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

export default AppRouter;
