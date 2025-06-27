 

const Contact = () => {
    return (
        <>
        <section className="contact" id="contact"  aria-label="section contact du portfolio">
            <h2>Contact</h2>
            <form action="" method="post">
                <label htmlFor="">Nom</label>
                <input type="text" name="name" id="name" />
                
                <label htmlFor="">Prénom</label>
                <input type="text" name="" id="" />
                
                <label htmlFor="email">Email</label>
				<input type="email" name="email" id="email"></input>
            </form>
        </section>
        </>
    );
}

export default Contact;