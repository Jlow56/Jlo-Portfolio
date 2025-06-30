import "./FilterButtons.scss"; // ou dans Project.scss si tu préfères tout centraliser

function FilterButtons({ techList, activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
        <button className={`filter-btn ${activeFilter === "" ? "active" : ""}`} onClick={() => onFilterChange("")}>
            Tous
        </button>
        {techList.map((tech) => (
            <button key={tech} className={`filter-btn ${activeFilter === tech ? "active" : ""}`} onClick={() => onFilterChange(tech)}>
                {tech}
            </button>
        ))}
    </div>
  );
}

export default FilterButtons;