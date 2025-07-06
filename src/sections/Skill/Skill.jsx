import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import skillsData from "../../datas/skills.json";
import LogoCarousel from "../../components/Skills/LogoCarousel";

import rubyIconeLight from "../../assets/logo/Skills/soft/ruby-dark.png";
import rubyIconeDark from  "../../assets/logo/Skills/soft/ruby-light.png";

import "./Skill.scss";


function Skill() {
  const { isDark } = useContext(ThemeContext);
  const rubyIcone = isDark ? rubyIconeDark : rubyIconeLight;

  return (
    <section className="skills" id="skills" aria-label="section compétences du portfolio">
      <h2 className="skills-title">Mes compétences</h2>
      <div className="skills-container">
        {skillsData.map((category) => (
          <div className="skills-item" key={category.id}>
            <h3>{category.category}</h3>
              {category.category === "Soft Skills" && (
                <img src={rubyIcone} alt="Icône Ruby" className="ruby-icon"/>
              )}
            <ul  className={`skill-list ${category.category.replace(/\s+/g, '-').toLowerCase()}`}>
              {category.skills ? (
                category.skills.map((skill, index) => (
                  <li key={index} className="skill"> {skill.name}</li>
                ))
              ) : (
                Object.entries(category).map(([key, value]) => {
                  if (["id", "category", "logo"].includes(key)) return null;
                  return (
                    <li key={key} className="skill">
                      <strong>{key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")} :</strong> {value}
                    </li>
                  );
                })
              )}
            </ul>

            {category.logo && category.logo.length > 0 && (
              <LogoCarousel logos={category.logo} />
            )}
          </div>
        ))}
      </div>
       <div className="miro-container">
      <iframe
        className="miro-embed"
        title="Board Miro intégré"
        width="900"
        height="600"
        src="https://miro.com/app/live-embed/uXjVIhudLoQ=/?focusWidget=3458764633748795473&embedMode=view_only_without_ui&embedId=826610631098"
        frameBorder="0"
        allow="fullscreen; clipboard-read; clipboard-write"
        allowFullScreen
      />
    </div>
    </section>
  );
}

export default Skill;

//  <div className={`skills-item ${category.category.replace(/\s+/g, '-').toLowerCase()}`} key={category.id}></div>