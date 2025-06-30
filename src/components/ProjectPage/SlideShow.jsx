import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./SlideShow.scss";

function SlideShow({ img }) {
  const [slideId, setSlideId] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (imgRef.current) {
        setImgWidth(imgRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onNext = () => {
    setSlideId(prev => (prev + 1) % img.length);
  };
  const onPrev = () => {
    setSlideId(prev => (prev - 1 + img.length) % img.length);
  };

  return (
    <section className="slider-section">
      <div className="slideshow-img-container" style={{transform: `translateX(-${slideId * imgWidth}px)`}}>
        <img className="slideshow-img" alt={`slide-${slideId}`} src={img[slideId]} key={slideId}/>
      </div>
      {img.length > 1 && (
        <>
          <div className="slideshow-controls">
            <i className="slideshow-controls-chevron" onClick={onPrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </i>
            <i className="slideshow-controls-chevron" onClick={onNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          </div>
          <div className="slideshow-count">
            <p>{slideId + 1} / {img.length}</p>
          </div>
        </>
      )}
    </section>
  );
}

export default SlideShow;