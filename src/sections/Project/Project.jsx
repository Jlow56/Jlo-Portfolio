import React from "react";   
import "./Project.scss";
// import { projects } from "../../data/projects";

const Project = () => { 
    return (
        <div className="projects"  id="projects" aria-label="section projets du portfolio">
            <h1 className="projects-title">Mes projets</h1>
            <div className="projects-container">
                {/* <ShowCards accomodations={projects} /> */}
            </div>
        </div>
    )
}

export default Project;