import React from 'react';
import './Contact.scss';

const Contact = () => (
  <section id="contact" aria-label="Contact">
    <h2>Contact</h2>
    <form action="https://formsubmit.co/jlowdev56@gmail.com" method="POST" className='contact-form'>
        {/* ─── Anti‑spam et redirections ─── */}
        <input type="hidden" name="_captcha" value="true" />  
        {/* Active reCAPTCHA automatiquement */}
        <input type="hidden" name="_next" value="https://jlowportfolio.vercel.app/merci"/>
        {/* Anti-spam invisible */}
        <input type="text" name="_honey" style={{ display: 'none' }} />
        <input type="hidden" name="_template" value="box" />


        <label htmlFor="nom">Nom</label>
        <input type="text" name="nom" id="nom" required />

        <label htmlFor="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" rows="5" required />

        <button type="submit" className='btn-contact'>Envoyer</button>
        </form>
  </section>
);

export default Contact;