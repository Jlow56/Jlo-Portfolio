import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import SlideShow from '../components/ProjectPage/SlideShow';
import ProjectContent from '../components/ProjectPage/ProjectContent';
import ErrorPage from './Error';

import data from '../datas/projects.json';
import './ProjectDetails.scss';


function ProjectDetails() {
    const { id } = useParams();
    const location = useLocation();

    const projectData = data.find((project) => project.id === id);

    useEffect(() => {
      const path = location.pathname;

      if ((/^\/Project\/[^/]+$/.test(path))){
        document.body.classList.add('page-projet');
      }

      return () => {
        document.body.classList.remove('page-projet');
      };
    }, [location]);

    if (!projectData) {
      return <ErrorPage />;
    }

    return (
      <>
        <section className="project-container" id="project" aria-label="Pages des détails des projets du portfolio" key={projectData.id}>
            <SlideShow img={projectData.image} />
            <ProjectContent project={projectData} description={projectData.description} problematic={projectData.problematic} solution={projectData.solution}/>
        </section>
      </>
    );
};

export default ProjectDetails;