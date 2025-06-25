import React from "react";
import "./Education.module.scss";

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="education-container">
        <h2>Formations</h2>
        <div className="education-item">
          <h3>Développeur Web et Web Mobile</h3>
          <p>OpenClassrooms - 2023</p>
          <p>
            Formation intensive de 6 mois pour devenir développeur web et web
            mobile, avec un focus sur les technologies modernes.
          </p>
        </div>
        <div className="education-item">
          <h3>Bachelor en Informatique</h3>
          <p>Université de Paris - 2021</p>
          <p>
            Licence en informatique avec une spécialisation en développement
            logiciel.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Education;
