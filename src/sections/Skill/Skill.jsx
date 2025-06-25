import React from "react";
import  "./Skill.scss";

const Skill = () => {
    return (
        <div className="skills" id="skills" aria-label="section compétences du portfolio">
            <h1 className="skills-title">Mes compétences</h1>
            <div className="skills-container">
                <div className="skills-item">
                    <h2>Développement Web</h2>
                    <p>HTML, CSS, JavaScript, React, Node.js</p>
                </div>
                <div className="skills-item">
                    <h2>Base de données</h2>
                    <p>MySQL, MongoDB, PostgreSQL</p>
                </div>
                <div className="skills-item">
                    <h2>Outils et technologies</h2>
                    <p>Git, Docker, AWS, Firebase</p>
                </div>
            </div>
        </div>
    );
}

export default Skill