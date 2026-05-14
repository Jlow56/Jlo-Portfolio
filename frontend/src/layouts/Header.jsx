import { useContext, useState, useEffect } from 'react';
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

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = isDark ? logoDark : logoLight;
  const githubLogo = isDark ? logoGithubDark : logoGithubLight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu si  resize vers desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Ferme le menu si  resize vers desktop
  {menuOpen && (
    <div
        className="nav-overlay"
        onClick={() => setMenuOpen(false)}
    />
  )}

  // Ferme le menu après un clic sur un lien et scroll vers la section
  const handleClick = (sectionId) => {
    setMenuOpen(false); 
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  const navItems = [
    { label: 'introduction', id: 'introduction' },
    { label: 'Compétences',  id: 'skills' },
    { label: 'Projets',      id: 'projects' },
    { label: 'Formations',   id: 'education' },
    { label: 'Présentation', id: 'introducing' },
    { label: 'Contact',      id: 'contact' },
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header-container">

        <div className="header-logo">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src={logo} alt="Logo JlowDev" className="logo-JlowDev" />
          </a>
        </div>

        {/* Hamburger — visible uniquement mobile */}
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header-nav ${menuOpen ? "header-nav--open" : ""}`} aria-label="Navigation principale">
          <ul className="header-nav-ul">
            <li className="header-li">
              <a href="https://github.com/Jlow56" className="header-nav-link logo" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" className="github-logo" />
              </a>
            </li>
            <li className="header-li">
              <a href="https://www.linkedin.com/in/jean-louis-jean-bienvenu/" className="header-nav-link logo" target="_blank" rel="noopener noreferrer">
                <img src={logoLinkedIn} alt="LinkedIn" className="linkedin-logo" />
              </a>
            </li>

            {navItems.map(({ label, id }) => (
              <li key={id} className="header-li">
                <button
                  className="header-nav-button"
                  onClick={() => handleClick(id)}
                  aria-label={`Aller à la section ${label}`}
                >
                  {label}
                </button>
              </li>
            ))}

            <li className="header-li">
              <ThemeToggleButton isDark={isDark} onChange={toggleTheme} />
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;