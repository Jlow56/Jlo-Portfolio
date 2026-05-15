import Home from '../../sections/Home/Home';
import Presentation from '../../sections/Presentation/Presentation';
import Skill from '../../sections/Skill/Skill';
import Project from '../../sections/Project/Project';
import Education from '../../sections/Education/Education';
import Introducing from '../../sections/Introducing/Introducing';
import Contact from "../../sections/Contact/Contact";

const Portfolio = () => {
    return (
        <>
            <Home/>
            <Presentation/>
            <Skill/>
            <Project/>
            <Education/>
            <Introducing/> 
            <Contact/>
        </>
    );
};

export default Portfolio;