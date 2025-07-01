 
const Contact = () => {
    return (
        <section className="contact" id="contact" aria-label="section contact du portfolio">
            <h2>Contact</h2>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" required />

                <label htmlFor="firstname">Prénom</label>
                <input type="text" name="firstname" id="firstname" required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />

                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows="5" required />

                <button type="submit">Envoyer</button>
            </form>
        </section>
    );
};

export default Contact;