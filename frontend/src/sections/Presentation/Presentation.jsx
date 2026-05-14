import './Presentation.scss';

const Presentation = () => {
    return (
        <>
            <section className="presentation-section" id='introduction' aria-label="section de présentation">
                <h2 className="presentation-title">
                    Vous cherchez un développeur web humain ?
                </h2>
                <p className="presentation-description">
                    <span className="presentation-span">Vous êtes au bon endroit!</span> 
                    <br/> 
                    Développeur web junior diplômé en juillet 2025. Je conçois et réalise des sites et applications web modernes, évolutifs et entièrement responsives (mobile, tablette, bureau).
                    <br/>
                    Je travaille avec React, Node.js, Express, MongoDB, PHP/MySQL, JavaScript, HTML et CSS. Je suis à l’aise avec Git et les méthodologies agiles (Trello), et j’accorde une attention particulière à l’expérience utilisateur, à l’accessibilité et aux performances.
                    <br/>
                </p>
                <br/>
                <div className="cta-contact">
                    <a className="contact-link" href="#contact">Contactez-moi</a>
                </div>
            </section>
        </>
    );
};

export default Presentation;

