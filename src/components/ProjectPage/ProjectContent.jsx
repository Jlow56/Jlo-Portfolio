import { useContext } from 'react';
import Collapse from "../../layouts/Collapse";
import { ThemeContext } from '../../context/ThemeContext';

import logoInternetDark from '../../assets/logo/Header/icon-internet-dark.svg';
import logoInternetLight from '../../assets/logo/Header/icon-internet-light.svg';
import logoGithubLight from '../../assets/logo/Header/github-theme-light.png';
import logoGithubDark from '../../assets/logo/Header/github-theme-neon.png';


import "./ProjectContent.scss";

function ProjectContent({ project }) {
  const { isDark } = useContext(ThemeContext);

  const internetLogo = isDark ? logoInternetDark : logoInternetLight;
  const githubLogo = isDark ? logoGithubDark : logoGithubLight;

  return (
    <article className="project-content">
      <section className="top-container"> 
        <div className="project-header-left">
          <h2>{project.name}</h2>
          <p>Catégorie : {project.category}</p>
          <p>Technologies utilisées : {project.technologies.join(', ')}</p> 
        </div>
        <div className="project-header-right">
          <div className="link-container website">
            <img src={internetLogo} alt="Internet" className='internet-logo' />
            <a href={project.link} className="website-link" target="_blank" rel="noopener noreferrer">
              <p>Voir le site en ligne</p>
            </a>
          </div>
          <div className="link-container github">
            <img src={githubLogo} alt="GitHub" className='github-logo' />
            <a href={project["git-hub"]} className="github-link" target="_blank" rel="noopener noreferrer">
              <p>Voir le code sur GitHub</p>
            </a>
          </div>
        </div>
      </section>

      <section className="bottom-container">
        <div className="collapse-container">
          <Collapse title='Description' content={project.description}>
            <p className="project-p">{project.description}</p>
          </Collapse> 
        </div>
        <div className="collapse-container">
          <Collapse title='Problématique' content={project.problematic}>
            <p className="project-p">{project.problematic}</p>
          </Collapse>
        </div>
        <div className="collapse-container">
          <Collapse title='Solution' content={project.solution}>
            <p className="project-p">{project.solution}</p>
          </Collapse>
        </div>
      </section>
    </article>
  );
}

export default ProjectContent;