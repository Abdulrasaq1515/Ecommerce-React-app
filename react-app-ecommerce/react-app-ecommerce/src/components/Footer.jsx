import React from "react";
import EmailLogo from "../assets/emailLogo/EmailLogo.jsx";
import ShopLogo from "../assets/icons/ShopLogo.jsx";
import SocialIcon from "../assets/socialIcon/SocialIcon.jsx";
import PaymentLogo from "../assets/paymentLogo/PaymentLogo.jsx";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-banner">
                <h1>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                <div className="footer-email-search">
                    <EmailLogo/>
                    <input type="text" placeholder="Enter your email address" />
                    <button>Subscribe to Newsletter</button>
                </div>
            </div>
            <div className="footer-main">
                <div className="footer-column">
                    <ShopLogo/>
                    <p>
                        We have clothes that suit your style and keep you up to wear.
                        From women to men.
                    </p>
                    <div className="social-icons">
                        <SocialIcon/>
                    </div>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>COMPANY</h4>
                        <p>About</p>
                        <p>Features</p>
                        <p>Works</p>
                        <p>Careers</p>
                    </div>
                    <div>
                        <h4>HELP</h4>
                        <p>Customer Support</p>
                        <p>Delivery Details</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div>
                        <h4>FAQ</h4>
                        <p>Account</p>
                        <p>Manage Deliveries</p>
                        <p>Orders</p>
                        <p>Payments</p>
                    </div>
                    <div>
                        <h4>RESOURCES</h4>
                        <p>Free eBooks</p>
                        <p>Development Tutorial </p>
                        <p>How to - Blog</p>
                        <p>Youtube Playlist</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Shop.co @ 2000-2023 All rights reserved.</p>
                <div className="payment-logos">
                    <PaymentLogo/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
