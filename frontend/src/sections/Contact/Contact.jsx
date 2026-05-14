import { useState } from "react";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", message: ""
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");

      setStatus("success");
      setFormData({ nom: "", prenom: "", email: "", message: "" });

    } catch (err) {
       console.error("Erreur contact:", err); 
      setStatus("error");
      setErrorMsg(err.message || "Une erreur est survenue. Réessayez plus tard.");
    }
  };

  return (
    <section id="contact" aria-label="Contact">
      <h2>Contact</h2>

      {status === "success" && (
        <p className="success-message">Message envoyé ! Je vous répondrai rapidement.</p>
      )}
      {status === "error" && (
        <p className="error-message">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="nom">Nom</label>
        <input type="text" name="nom" id="nom" value={formData.nom} onChange={handleChange} required />

        <label htmlFor="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" value={formData.prenom} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required />

        <button
          type="submit"
          className="btn-contact"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </section>
  );
};

export default Contact;