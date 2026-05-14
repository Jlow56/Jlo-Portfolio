import './Introducing.scss';
import { useState, useEffect, useRef } from 'react';
import SlideShow from "../../components/ProjectPage/SlideShow";

// Détection des images (mais sans chargement immédiat)
const images = import.meta.glob(
  '../../assets/img/galerie/*.{webp,png,jpg,jpeg,svg}',
  { import: 'default' }
);

const imageLoaders = Object.values(images);

const cards = [
  {
    id: 'parcours',
    emoji: '🧭',
    title: 'Mon parcours',
    content: `Avant de me lancer dans le développement web, j'ai travaillé dans la restauration avec un bac technologique hôtelier et une mention complémentaire cuisine allégée comme formation (2010-2016), dans l'armée de terre (2016-2019), dans l'Éducation nationale (2019-2023) et en intérim. 
Ces expériences m'ont forgé des compétences solides : communication, travail d'équipe, pédagogie, résilience et leadership.`
  },
  {
    id: 'apprentissage',
    emoji: '💻',
    title: 'Mon apprentissage',
    content: `J'ai commencé le développement web en 2023, de manière autodidacte via des MMOOCs et des formations en ligne. Ce domaine stimule ma curiosité, ma créativité et mon envie d'apprendre chaque jour.`
  },
  {
    id: 'objectifs',
    emoji: '🎯',
    title: 'Objectifs',
    content: `Je recherche une entreprise pour une alternance. Objectif : développement web puis cybersécurité.`,
  },
  {
    id: 'localisation',
    emoji: '📍',
    title: 'Où ?',
    content: `Originaire de Bretagne, je réside actuellement dans le pays de Fougères.`,
  },
  {
    id: 'passions',
    emoji: '🎮',
    title: 'Passions',
    content: `Sport, jeux vidéo, géopolitique et technologie.`,
  },
];

function Introducing() {
  const galleryRef = useRef(null);

  const [shouldLoadGallery, setShouldLoadGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // 1. Observer la visibilité de la galerie
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGallery(true);
          observer.disconnect(); // on stoppe après déclenchement
        }
      },
      { threshold: 0.2 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Charger les images uniquement quand visible
  useEffect(() => {
    if (!shouldLoadGallery) return;

    let isMounted = true;

    Promise.all(imageLoaders.map((loader) => loader()))
      .then((imgs) => {
        if (isMounted) {
          setGalleryImages(imgs);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [shouldLoadGallery]);

  return (
    <>
      {/* SECTION INTRO */}
      <section className="introducing-section" id="introducing">
        <h2 className="introducing-title">Qui suis-je ?</h2>

        <div className="introducing-grid">
          {cards.map(({ id, emoji, title, content }) => (
            <article key={id} className={`introducing-card introducing-card--${id}`}>
              <div className="introducing-card__header">
                <span>{emoji}</span>
                <h3>{title}</h3>
              </div>
              <p>{content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION GALERIE */}
      <section
        ref={galleryRef}
        className="gallery-section"
        id="gallery"
      >
        <h2 className="gallery-title">Galerie</h2>

        {!shouldLoadGallery && (
          <p>Chargement au scroll…</p>
        )}

        {shouldLoadGallery && (
          <SlideShow img={galleryImages} />
        )}
      </section>
    </>
  );
}

export default Introducing;