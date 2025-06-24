import React from "react"; 

const Contact = () => {
    return (
        <>
            <h2>Contact</h2>
            <form action="" method="post">
                <label htmlFor="">Nom</label>
                <input type="text" name="name" id="name" />
                
                <label htmlFor="">Prénom</label>
                <input type="text" name="" id="" />
                
                <label htmlfor="email">Email</label>
				<input type="email" name="email" id="email"></input>
            </form>
        </>
    );
}

export default Contact