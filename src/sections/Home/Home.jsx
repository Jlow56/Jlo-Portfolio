import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import homeCirlceBackgroundWhite from '../../assets/img/home/home-cirlce-background-white.svg';
import homeCirlceBackgroundDark from '../../assets/img/home/home-circle-background-dark.svg';

import downloadLogo from '../../assets/logo/Home/download-logo.svg';

import './Home.scss';

function Home() {
     const { isDark } = useContext(ThemeContext);
     const homeCircleBackground = isDark ? homeCirlceBackgroundDark : homeCirlceBackgroundWhite;
        

    return (
        <>
            <section className="home" id="home" aria-label="section accueil du portfolio">
                <div className="home-left-container">
                    <div className="home-left-content">
                        <h1 className="home-title">
                            Bonjour, moi c’est <br/>
                            <span>Jean-louis</span><br/>
                            Full Stack Web Developer
                        </h1>
                    </div>
                    <div className="cta-cv">
                        <a href="https://www.canva.com/design/DAF_8RyGtKs/_19JftruejbOLl7rH1VGmA/edit?utm_content=DAF_8RyGtKs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" className="btn btn-cv" target="_blank" rel="noopener noreferrer">
                            <span>Voir mon CV en ligne</span>
                            <img src={downloadLogo} alt="Download" className="download-icon" />
                        </a>
                    </div>
                    
                </div>
                <div className="home-right-container">
                    <div className="home-right-content">
                        <img src={homeCircleBackground} alt="Décor du fond d'écran" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;