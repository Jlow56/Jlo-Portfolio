import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ThemeToggleButton from '../components/Header/ThemeToggleButton';
import { ThemeContext } from '../context/ThemeContext';

import logoLight from '../assets/logo/JlowDev/Logo-Gris-Blanc.svg';
import logoDark from '../assets/logo/JlowDev/Logo-theme-dark.svg';

import logoGithubLight from '../assets/logo/Header/github-theme-light.png';
import logoGithubDark from '../assets/logo/Header/github-theme-neon.png';
import logoLinkedIn from '../assets/logo/Header/linkedin.png'; 

import './Header.scss';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  

  const logo = isDark ? logoDark : logoLight;
  const githubLogo = isDark ? logoGithubDark : logoGithubLight;
  
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
        <div className="header-logo logo-rotate">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src={logo} alt="Logo JlowDev" className='logo-JlowDev' />
          </a>
        </div>

        <nav className="header-nav" aria-label="Navigation principale">
          <ul className="header-nav-ul">

            <li className='header-li'>
              <a href="https://github.com/Jlow56" className="header-nav-link logo" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" className='github-logo' />
              </a>
            </li>

            <li className='header-li'>
              <a href="https://www.linkedin.com/in/jean-louis-jean-bienvenu/" className="header-nav-link" target="_blank" rel="noopener noreferrer">
                <img src={logoLinkedIn} alt="LinkedIn" className='linkedin-logo logo' />
              </a>
            </li>

            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('presentation')} aria-label="Aller à la section Présentation">Présentation</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('skills')} aria-label="Aller à la section Compétences">Compétences</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('projects')} aria-label="Aller à la section Projets">Projets</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('education')} aria-label="Aller à la section Formations">Formations</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('contact')} aria-label="Aller à la section Contact">Contact</button></li>
            <li className='header-li'><ThemeToggleButton isDark={isDark} onChange={toggleTheme}  aria-label={isDark ? "Activate light mode" : "Activate dark mode"}/></li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;