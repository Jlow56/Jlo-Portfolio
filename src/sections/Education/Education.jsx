import {VerticalTimeline,VerticalTimelineElement,} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Work, School, Star } from '@mui/icons-material';
import './Education.scss';



const Education = () => {
  return (
    <section id="timeline" className="p-8 bg-[#f9f9f9]">
      <h2 className="text-3xl font-bold text-center mb-12">Mon Parcours</h2>
      <VerticalTimeline animate={true} layout="2-columns">

        {/* FORMATIONS */}
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Janvier 2025 - Juillet 2025"
          iconStyle={{ background: '#e91e63', color: '#fff' }}
          icon={<School />}
        >
          <h3>Développeur Web</h3>
          <h4>OpenClassrooms (distanciel)</h4>
          <p>Création d’API, base de données, optimisation, gestion de projet web responsive.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Octobre 2023 - Juillet 2024"
          iconStyle={{ background: '#e91e63', color: '#fff' }}
          icon={<School />}
        >
          <h3>Développeur Web & Mobile</h3>
          <h4>3W Academy (distanciel)</h4>
          <p>Front-end réactif & Back-end sécurisé - Titre RNCP niveau 5</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Avril 2023"
          iconStyle={{ background: '#e91e63', color: '#fff' }}
          icon={<School />}
        >
          <h3>Apprendre à programmer avec JavaScript</h3>
          <h4>OpenClassrooms</h4>
          <p>Conditions, boucles, erreurs, code propre et maintenable.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Septembre 2022"
          iconStyle={{ background: '#e91e63', color: '#fff' }}
          icon={<School />}
        >
          <h3>Créer votre site web</h3>
          <h4>OpenClassrooms</h4>
          <p>HTML5, CSS3, mise en page et structure sémantique.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2008 - 2011"
          iconStyle={{ background: '#e91e63', color: '#fff' }}
          icon={<School />}
        >
          <h3>Bac Technologique Hôtelier</h3>
          <h4>Lycée Yvon Bourges, Dinard (35)</h4>
        </VerticalTimelineElement>

        {/* EXPÉRIENCES */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Avril 2024 - Juin 2024"
          iconStyle={{ background: '#2196f3', color: '#fff' }}
          icon={<Work />}
        >
          <h3>Stage Développeur Web</h3>
          <h4>ASPROBIR (distanciel)</h4>
          <p>Création d’un site vitrine pour une association (3W Academy).</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Juillet 2023"
          iconStyle={{ background: '#2196f3', color: '#fff' }}
          icon={<Work />}
        >
          <h3>Stage en référencement</h3>
          <h4>wwwup.fr (distanciel)</h4>
          <p>Optimisation de site web : SEO, performance, accessibilité.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2019 - 2021"
          iconStyle={{ background: '#2196f3', color: '#fff' }}
          icon={<Work />}
        >
          <h3>Assistant de Prévention et de Sécurité</h3>
          <h4>Collège Eugénie Tell Éboué - Guyane</h4>
          <p>Prévention, gestion de crise, mise en place de protocoles scolaires.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2016 - 2019"
          iconStyle={{ background: '#2196f3', color: '#fff' }}
          icon={<Work />}
        >
          <h3>Contrat militaire</h3>
          <h4>Armée de Terre - Vannes</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2013 - 2016"
          iconStyle={{ background: '#2196f3', color: '#fff' }}
          icon={<Work />}
        >
          <h3>Cuisinier / Serveur événementiel</h3>
          <h4>Traiteur Le Sommer - Grand-Champ</h4>
        </VerticalTimelineElement>

      </VerticalTimeline>
    </section>
  );
};

export default Education;
