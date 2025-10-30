import React from 'react';
import EmailLogo from "../assets/emailLogo/EmailLogo.jsx";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-section">
            <h1> STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            </div>
            <div className="footer-email-search">
                <EmailLogo/>
                <input type="text" placeholder="Enter your email address"/>
            </div>
            <div className= "subscribe-button">
                <button>Subscribe to Newsletter</button>
            </div>
        </div>
    );
}
export default Footer;