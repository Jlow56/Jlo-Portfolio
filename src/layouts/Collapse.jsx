import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Collapse.scss";
import "../components/About/AboutContent.scss";


const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div onClick={toggleCollapse} className="collapse-header" role="button" aria-expanded={isOpen} tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleCollapse();
        }}
      >
        <h2 className="collapse-header-title">{title}</h2>
        <i className={`collapse-header-icon ${isOpen ? "rotate" : ""}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </i>
      </div>

      <div ref={contentRef} className="collapse-content" style={{maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px"}}>
        {children}
      </div>
    </>
  );
};

export default Collapse;