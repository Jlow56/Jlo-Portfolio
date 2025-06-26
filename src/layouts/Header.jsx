import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggleButton from '../components/Header/ThemeToggleButton';
import { ThemeContext } from '../context/ThemeContext';

// 👉 Importe directement les deux SVG
import logoLight from '../assets/logo/JlowDev/Logo-Gris-Blanc.svg';
import logoDark  from '../assets/logo/JlowDev/Logo-theme-dark.svg';

import './Header.scss';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // Choix du logo selon le thème
  const logo = isDark ? logoDark : logoLight;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src={logo} alt="Logo JlowDev" className='logo-JlowDev'/>
          </a>
        </div>

        <nav className="header-nav logo-rotate" aria-label="Navigation principale">
          <ul>
            <li><button onClick={() => handleClick('presentation')}>Présentation</button></li>
            <li><button onClick={() => handleClick('skills')}>Compétences</button></li>
            <li><button onClick={() => handleClick('projects')}>Projets</button></li>
            <li><button onClick={() => handleClick('education')}>Formations</button></li>
            <li><button onClick={() => handleClick('contact')}>Contact</button></li>
            <li><ThemeToggleButton isDark={isDark} onChange={toggleTheme} /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;