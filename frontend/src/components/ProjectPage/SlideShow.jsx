import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./SlideShow.scss";

function SlideShow({ img }) {
  const [slideId, setSlideId] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const wrapperRef = useRef(null); // ← observe le wrapper, pas l'image

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width;
      if (width) setImgWidth(width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // ← wrapper toujours présent au montage, [] suffit

  const onNext = () => setSlideId(prev => (prev + 1) % img.length);
  const onPrev = () => setSlideId(prev => (prev - 1 + img.length) % img.length);

  return (
    <section className="slider-section">
      <div className="slideshow-wrapper" ref={wrapperRef}> {/* ← ref ici */}
        <div
          className="slideshow-img-container"
          style={{ transform: `translateX(-${slideId * imgWidth}px)` }}
        >
          {img.map((src, index) => (
            <img
              key={index}
              className="slideshow-img"
              src={src}
              alt={`slide-${index}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
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