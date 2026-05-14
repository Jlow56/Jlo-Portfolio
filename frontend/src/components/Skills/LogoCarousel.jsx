import "./LogoCarousel.scss";

const LogoCarousel = ({ logos }) => {
  return (
    <div className="logos">
      <div className="logos-slide">
        {logos.map((logo, index) => (
          <img key={`a-${index}`} src={logo} alt={`logo-${index}`} />
        ))}
      </div>
      <div className="logos-slide">
        {logos.map((logo, index) => (
          <img key={`b-${index}`} src={logo} alt={`logo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;