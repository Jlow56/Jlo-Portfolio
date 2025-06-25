import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <img className="footer-logo" src="{logo}" alt="logo" />
                </div>
                <div className="footer-content">
                    <p className="footer-text">© 2025 All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;