import './Main.scss';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};

export default Main;