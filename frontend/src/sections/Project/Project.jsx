import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FilterButtons from "../../components/Project/FilterButtons";
import { fetchProjects } from "../../api/project.api.ts";

import "./Project.scss";

function Project() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [uniqueTechs, setUniqueTechs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProjects();

        setProjects(data);
        setFilteredProjects(data);

        // Construction liste unique des technos pour les boutons de filtre
        const techSet = new Set();

        data.forEach((project) => {
          if (Array.isArray(project.technology)) {
            project.technology.forEach((tech) => {
              techSet.add(tech.trim());
            });
          }
        });
        setUniqueTechs([...techSet]);
      } catch (err) {
        console.error("Erreur lors du chargement des projets:", err);
        setError("Impossible de charger les projets. Réessayez plus tard.");
        setProjects([]);
        setFilteredProjects([]);
        setUniqueTechs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleFilterChange = (tech) => {
    setActiveFilter(tech);

    if (!tech) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          Array.isArray(project.technology) &&
          project.technology.some((t) => t.trim() === tech)
      );
      setFilteredProjects(filtered);
    }
  };

  if (loading) return (
    <section className="project-section" id="projects">
      <div className="projects-div">
        <h2 className="projects-title">Mes projets</h2>
        <p className="loading-message">Chargement...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="project-section" id="projects">
      <div className="projects-div">
        <h2 className="projects-title">Mes projets</h2>
        <p className="error-message">{error}</p>
      </div>
    </section>
  );


  return (
    <section className="project-section" id="projects">
      <div className="projects-div">
        <h2 className="projects-title">Mes projets</h2>
        <FilterButtons techList={uniqueTechs} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project.id} className="project-card" to={`/project/${project.slug}`}>
                <div className="project-cover">
                  <img src={`/${project.cover}`} alt={project.name} className="project-image" />
                </div>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.shortDescription}</p>
              </Link>
            ))
          ) : (
            <p>Aucun projet disponible.</p>
          )}
        </div>
      </div>
    </section>
  );
  
}

export default Project;