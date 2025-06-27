import "./Skill.scss";
import skillsData from "../../datas/skills.json";
import LogoCarousel from "../../components/Skills/LogoCarousel";

function Skill() {
  return (
    <div className="skills" id="skills" aria-label="section compétences du portfolio">
      <h2 className="skills-title">Mes compétences</h2>
      <div className="skills-container">
        {skillsData.map((category) => (
          <div className="skills-item" key={category.id}>
            <h3>{category.category}</h3>
            <ul className="skills-list">
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
    </div>
  );
}

export default Skill;
