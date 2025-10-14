import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.scss';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Envoi via FormSubmit
    await fetch("https://formsubmit.co/jlowdev56@gmail.com", {
      method: "POST",
      body: data
    });

    // Redirection interne (sans rechargement)
    navigate("/merci");
  };

  return (
    <section id="contact" aria-label="Contact">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="box" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <label htmlFor="nom">Nom</label>
        <input type="text" name="nom" id="nom" required />

        <label htmlFor="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" rows="5" required />

        <button type="submit" className="btn-contact">Envoyer</button>
      </form>
    </section>
  );
};

export default Contact;