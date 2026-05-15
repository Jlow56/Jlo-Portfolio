import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import SlideShow from "../../components/ProjectPage/SlideShow";
import ProjectContent from "../../components/ProjectPage/ProjectContent";
import ErrorPage from "./Error";

import { fetchProjectBySlug } from "../../api/project.api.ts";

import "./ProjectDetails.scss";

function ProjectDetails() {
  const { slug } = useParams(); // utiliser le nom exact défini dans la route
  const location = useLocation();

  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) {
        setError(true);
        return;
      }
      try {
        const data = await fetchProjectBySlug(slug);
        setProjectData(data);
      } catch {
        setError(true);
      }
    };

    load();
  }, [slug]);

  useEffect(() => {
    const path = location.pathname;

    if (/^\/project\/[^/]+$/.test(path)) {
      document.body.classList.add("page-projet");
    }

    return () => {
      document.body.classList.remove("page-projet");
    };
  }, [location]);

  if (error) {
    return <ErrorPage />;
  }

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="project-container" id="project" key={projectData._id}>
      <SlideShow img={projectData.image} alt={projectData.name} />
      <ProjectContent project={projectData} description={projectData.description} problematic={projectData.problematic} solution={projectData.solution} />
    </section>
  );
}

export default ProjectDetails;