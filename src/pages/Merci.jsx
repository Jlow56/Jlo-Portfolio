import { Link } from "react-router-dom";

function Merci() {
  return (
    <>
      <div className="merci-container flex">
        <h2>Merci pour votre message 🎉</h2>
        <p>Je vous repondrais rapidement.</p>
      </div>
      <div className="home-link-container">
        <Link to="/" className="home-link">Retourner sur la page d'accueil</Link>
      </div>
    </>
  );
}

export default Merci;