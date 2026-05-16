import { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';            // ← AJOUT: import createPortal
import { useLocation, useNavigate } from 'react-router-dom';
 
import ThemeToggleButton from '../components/Header/ThemeToggleButton';
import { ThemeContext } from '../context/ThemeContext';
 
import logoLight    from '../assets/logo/JlowDev/Logo-Gris-Blanc.svg';
import logoDark     from '../assets/logo/JlowDev/Logo-theme-dark.svg';
import logoGithubLight from '../assets/logo/Header/github-theme-light.png';
import logoGithubDark  from '../assets/logo/Header/github-theme-neon.png';
import logoLinkedIn    from '../assets/logo/Header/linkedin.png';
 
import './Header.scss';
 
function Header() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);
 
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
 
  const logo       = isDark ? logoDark       : logoLight;
  const githubLogo = isDark ? logoGithubDark : logoGithubLight;
 
  // ── Détection du scroll ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  // ── Ferme le menu si on redimensionne vers desktop ──────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
 
  // ── ✅ NOUVEAU : bloque le scroll du body quand menu ouvert ──
  // Pourquoi ? Sur mobile, si le body peut scroller pendant que le
  // menu est ouvert, l'utilisateur scrolle "en fond" sans le voir.
  // C'est une mauvaise UX. On bloque avec overflow: hidden.
  // Le return () nettoie quand le composant se démonte.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
 
  // ── Navigation avec scroll doux ─────────────────────────────
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
 
  const handleClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };
 
  // ── Items de navigation ─────────────────────────────────────
  const navItems = [
    { label: 'Introduction', id: 'introduction' },
    { label: 'Compétences',  id: 'skills'        },
    { label: 'Projets',      id: 'projects'      },
    { label: 'Formations',   id: 'education'     },
    { label: 'Présentation', id: 'introducing'   },
    { label: 'Contact',      id: 'contact'       },
  ];
 
  // ── Liste des liens de nav (réutilisée desktop + mobile) ────
  // Factorisation : on évite de dupliquer le même JSX deux fois
  const NavLinks = () => (
    <ul className="header-nav-ul">
      <li className="header-li">
        <a
          href="https://github.com/Jlow56"
          className="header-nav-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir mon GitHub"
        >
          <img src={githubLogo} alt="GitHub" className="github-logo" />
        </a>
      </li>
      <li className="header-li">
        <a
          href="https://www.linkedin.com/in/jean-louis-jean-bienvenu/"
          className="header-nav-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir mon LinkedIn"
        >
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
  );
 
  // ── ✅ MENU MOBILE via createPortal ─────────────────────────
  // createPortal(contenu, destinationDOM)
  // → Le contenu est rendu directement dans document.body
  // → Il échappe complètement au header et son backdrop-filter
  // → position: fixed fonctionne par rapport à l'ÉCRAN (viewport)
  //   et non par rapport au header
  const mobileMenuPortal = menuOpen
    ? createPortal(
        <>
          {/* Overlay sombre — cliquable pour fermer */}
          {/* ✅ CORRIGÉ : était dans le corps de la fonction, jamais rendu */}
          <div
            className="nav-overlay"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
 
          {/* Panneau de navigation mobile */}
          {/* ✅ CORRIGÉ : width 100vw, positionné par rapport au viewport */}
          <nav
            className="header-nav-mobile"
            aria-label="Navigation principale mobile"
          >
            {/* Bouton fermer (croix) en haut à droite */}
            <button
              className="hamburger hamburger--open mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <span />
              <span />
              <span />
            </button>
 
            <NavLinks />
          </nav>
        </>,
        document.body   // ← rendu directement dans <body>, hors du header
      )
    : null;
 
  // ── RENDU ────────────────────────────────────────────────────
  // Note : le Fragment <> </> permet de retourner plusieurs éléments
  // sans div wrapper. Le header + le portal côte à côte.
  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header-container">
 
          {/* Logo — clique → retour accueil */}
          <div className="header-logo">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              aria-label="Retour à l'accueil"
            >
              <img src={logo} alt="Logo JlowDev" className="logo-JlowDev" />
            </a>
          </div>
 
          {/* Nav desktop — cachée sur mobile via CSS */}
          <nav className="header-nav-desktop" aria-label="Navigation principale">
            <NavLinks />
          </nav>
 
          {/* Bouton hamburger — visible uniquement mobile */}
          <button
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="header-nav-mobile"
          >
            <span />
            <span />
            <span />
          </button>
 
        </div>
      </header>
 
      {/* Menu mobile rendu ICI, EN DEHORS du header, via createPortal */}
      {mobileMenuPortal}
    </>
  );
}
 
export default Header;
 