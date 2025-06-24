import React from 'react';

const Home = () => {
    return (
        <>
            <section className="home" id="home">
                <div className="home-right-container">
                    <div className="home-right-content">
                        <h1 className="home-title">
                            Bonjour, moi c’est <br/>
                            <span>Jean-louis</span><br/>
                            Full Stack Web Developer
                        </h1>
                    </div>
                    <div className="cta-cv">
                        <a href="/assets/CV_Jean-Louis_BENZI.pdf" className="btn btn-primary" download>
                            <p>Télécharger mon CV</p>
                            <img src="/assets/images/download.svg" alt="Download" />
                        </a>
                    </div>
                    <div className="home-image">
                        <img src="/assets/images/home.png" alt="Home" />
                    </div>
                </div>
                <div className="home-left-container">
                    <div className="home-left-content">
                        <img src="/assets/images/home.png" alt="Home" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;