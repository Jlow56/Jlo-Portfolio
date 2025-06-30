import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FilterButtons from "../../components/Project/FilterButtons";

import projectsData from "../../datas/projects.json";

import "./Project.scss";

function Project() {
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeFilter, setActiveFilter] = useState("");
  const [uniqueTechs, setUniqueTechs] = useState([]);

  useEffect(() => {
    const techSet = new Set();

    projectsData.forEach((project) => {
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach((tech) => {
          tech.split(',').forEach(t => techSet.add(t.trim()));
        });
      }
    });

    setUniqueTechs([...techSet]);
  }, []);

  const handleFilterChange = (tech) => {
    setActiveFilter(tech);
    if (tech === "") {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter((project) =>
        Array.isArray(project.technologies) &&
        project.technologies.some((t) =>
          t.split(',').map((s) => s.trim()).includes(tech)
        )
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section className="project-section" id="projects" aria-label="section projets du portfolio">
        <div className="projects">
          <h2 className="projects-title">Mes projets</h2>
          <FilterButtons techList={uniqueTechs} activeFilter={activeFilter} onFilterChange={handleFilterChange}/>
          <div className="projects-container">
            {filteredProjects.map((project) => (
              <Link key={project.id} className="project-card" to={`/project/${project.id}`}>
                <div className="project-cover">
                  <img src={project.cover} alt={project.name} className="project-image" />
                </div>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
}

export default Project;