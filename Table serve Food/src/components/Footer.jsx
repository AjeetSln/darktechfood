// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Help Center</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul className="social-icons">
                        <li><a href="https://www.instagram.com/_mr.ajeet_2005?igsh=c3FtN3hveDc0eW4z" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i> Instagram </a></li>
                        <li><a href="https://www.linkedin.com/in/ajeet-prajapati-336442219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i> Linkedin </a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 @Darktech Ajeet. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
