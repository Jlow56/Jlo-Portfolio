import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

function Header() {
    return (
        <header className="header">
            <nav className="header-navbar">
                <NavLink to="/">
                    <img src={logo} alt="logo portfolio de JlowDev" />
                </NavLink>

               <ul className="header-navbar-ul">
                    <li>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className="nav-link">Projects</NavLink>
                    </li>
               </ul>
            </nav>
        </header>
    );
}

export default Header;