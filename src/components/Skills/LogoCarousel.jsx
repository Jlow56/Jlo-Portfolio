import React, { useEffect, useRef } from "react";
import "./LogoCarousel.scss";

const LogoCarouselLight = ({ logos }) => {
  const slideRef = useRef(null);

  useEffect(() => {
    // Clone pour effet boucle
    if (slideRef.current) {
      const clone = slideRef.current.cloneNode(true);
      slideRef.current.parentNode.appendChild(clone);
    }
  }, []);

  return (
    <div className="logos">
      <div className="logos-slide" ref={slideRef}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`logo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default LogoCarouselLight;