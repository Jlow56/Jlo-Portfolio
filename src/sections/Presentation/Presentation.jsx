import './Presentation.scss';

const Presentation = () => {
    return (
        <>
            <section className="presentation-section" id='presentation' aria-label="section de présentation">
                <h2 className="presentation-title">
                    Vous cherchez un développeur web ?
                </h2>
                <p className="presentation-description">
                    <span className="presentation-span">Vous êtes au bon endroit!</span> <br/> 

                    Je fais du développement de site web & web-mobile, un hobbie puis  une passion et finalement, j’améliore et j'acquiers de nouvelles compétences dans le but de devenir expert dans ce domaine en y consacrant tout mon temps  
                    et en réalisant des projets professionnels de qualité et innovants.<br/>
                    
                    Originaire de la région vannetaise, je suis actuellement en reconversion professionnelle après avoir travaillé dans les
                    domaines de la restauration, de l'armée de terre et de l'éducation nationale. <br/>

                    Je suis à la recherche d’une entreprise pour un contrat de professionnalisation, disponible à partir de mi-juillet 2025 afin d'acquérir de nouvelles compétences 
                    et obtenir un bachelor en développement web avec SUP DE VINCI Rennes. Pour en savoir plus sur la formation c'est <a href="https://www.supdevinci.fr/formation/bachelor-developpeur-web-et-mobile" target="_blank" rel="noopener noreferrer">ici</a><br/>

                    <span className="presentation-span">Objectifs ? </span><br/>
                     Monter en compétences et m'épanouir en développant des applications mobiles et bureautiques. ANGULAR, PYTHON, C#, SWIFT et KOTLIN n'auront bientôt plus de secrets pour moi. Sans compter une évolution sur ma capacité à gérer un projet et les softs skills 
                    nécessaires à mon environnement. <br/>

                    N'hésitez à me contacter, à bientôt Jean-Louis. 
                </p>
                <div className="cta-contact">
                    <a className="contact-link" href="#contact">Contactez-moi</a>
                </div>
                {/* <div className="presentation-image">
                    <img src="/assets/images/presentation.png" alt="Presentation" />
                </div> */}
            </section>
        </>
    );
};

export default Presentation;