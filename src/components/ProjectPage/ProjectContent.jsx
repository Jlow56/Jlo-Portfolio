import { Link} from "react-router-dom";
import Collapse from "../../layouts/Collapse";

import "./ProjectContent.scss";

function ProjectContent({ project }) {
    return (
        <>
            <article className="project-content">
                <section className="top-container"> 
                    <div className="project-header-left">
                        <h2>{project.name}</h2>
                        <p>Categorie : {project.category}</p>
                        <p>Technologies utilisées : {project.technologies.join(', ')}</p> {/* si c’est un tableau */}
                    </div>
                    <div className="project-header-right">
                        <Link key={project.id} className="website-link" to={project.link} target="_blank" rel="noopener noreferrer">
                            <p>Voir le site en ligne</p>
                        </Link>
                        
                        <Link key={`github-${project.id}`} className="github-link" to={project["git-hub"]} target="_blank" rel="noopener noreferrer">
                            <p>Voir le code sur GitHub</p>
                        </Link>
                    </div>
                </section>

                <section className="bottom-container">
                    <>
                        <div className="collapse-container">
                            <Collapse title='Description'content={project.description}>   
                                <p className="project-p">{project.description}</p>
                            </Collapse> 
                        </div>
                        <div className="collapse-container">
                            <Collapse title='Problématique'content={project.problematic}>
                                <p className="project-p">{project.problematic}</p>
                            </Collapse>
                        </div>
                        <div className="collapse-container">
                            <Collapse title='Solution'content={project.solution}>
                                <p className="project-p">{project.solution}</p>
                            </Collapse>
                        </div>
                     </>
                </section>
            </article>
        </>
    );          
}

export default ProjectContent;