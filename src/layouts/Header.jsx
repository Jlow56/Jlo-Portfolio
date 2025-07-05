import { useContext, useEffect, useRef } from 'react';
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
  const headerRef = useRef(null);

  const logo = isDark ? logoDark : logoLight;
  const githubLogo = isDark ? logoGithubDark : logoGithubLight;
  
   useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const el = headerRef.current;
      if (!el) return;

      if (window.scrollY > 40) {
        // Dès que scroll > 40px : fond aqua, opacité 1
        el.style.backgroundColor = 'aqua';
        el.style.opacity = '1';

        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (el) el.style.opacity = '0.9';
        }, 200);
      } else {
        // Sous le seuil : transparent, opacité 1
        el.style.backgroundColor = 'transparent';
        el.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

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

  const header = document.getElementById('header');
let scrollTimeout;

window.addEventListener('scroll', () => {
  // Appliquer le fond aqua pendant le scroll
  header.style.backgroundColor = 'aqua';
  header.style.opacity = '1';

  // Réinitialise le timer s’il existe
  if (scrollTimeout) clearTimeout(scrollTimeout);

  // Lancer un timer : après 200ms sans scroll, appliquer l’opacité 0.9
  scrollTimeout = setTimeout(() => {
    header.style.opacity = '0.9';
  }, 200);
});

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

            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('presentation')}>Présentation</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('skills')}>Compétences</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('projects')}>Projets</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('education')}>Formations</button></li>
            <li className='header-li'><button className="header-nav-button" onClick={() => handleClick('contact')}>Contact</button></li>
            <li className='header-li'><ThemeToggleButton isDark={isDark} onChange={toggleTheme} /></li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;