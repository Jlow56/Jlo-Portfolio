import React from 'react';

const Presentation = () => {
    return (
        <>
            <section className="presentation" id='presentation'>
                <h2 className="presentation-title">
                    Vous cherchez un développeur web ?
                </h2>
                <p className="presentation-description">
                    <span>Vous êtes au bon endroit!</span> <br/> 

                    Je fais du développement de site web & web-mobile, un hobbie, puis  une passion et finalement, j’améliore et aquiére de nouvelles compétences dans le but de devenir expert dans ce domaine en y consacrent tout mon temps  
                    et en réalisant des projets de qualité professionnel et innovant.<br/>
                    
                    Originaire de la région vannetaise, je suis actuellement en reconversion professionnelle, après avoir travaillé dans les
                    domaines de la restauration, armée de terre et éducation nationale. <br/>

                    Je suis à la recherche d’une entreprise pour un contrat de professionnalisation, disponible à partir de mi-juillet 2025, pour acquérir de nouvelles compétences 
                    et obtenir un bachelor en développement web avec SUP DE VINCI Rennes.Pour en savoir plus sur la formation c'est <a href="https://www.supdevinci.fr/formation/bachelor-developpeur-web-et-mobile" target="_blank" rel="noopener noreferrer">ici</a><br/>

                    Obectif : Monté en compétences et m'épanouir en développant des aplications mobile et bureautique. ANGULAR, PYTHON, C#, SWIFT et KOTLIN n'auront bientôt plus de secrets pour moi. Sans compter une évolution sur ma capacité à gérer un projet et les softs skills 
                    nécessaire à son environement. <br/>

                    N'hésitez à me contacter, à bientôt Jean-Louis. 
                </p>
                <div className="cta-contact">
                    <a href="#contact">Contactez-moi</a>
                </div>
                <div className="presentation-image">
                    <img src="/assets/images/presentation.png" alt="Presentation" />
                </div>
            </section>
        </>
    );
};

export default Presentation;