import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
    
        <div className="footer-brand">
          <h2 className="footer-logo">TheAwaz</h2>
          <p className="footer-tagline">Bringing Truth to Light</p>
          <div className="social-icons">
            <Link to="#" className="social-link"><FontAwesomeIcon icon={faFacebook} /></Link>
            <Link to="#" className="social-link"><FontAwesomeIcon icon={faTwitter} /></Link>
            <Link to="#" className="social-link"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link to="#" className="social-link"><FontAwesomeIcon icon={faYoutube} /></Link>
          </div>
        </div>

    
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/advertise">Advertise</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        {/* <div className="footer-section">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li><Link to="/politics">Politics</Link></li>
            <li><Link to="/technology">Technology</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/sports">Sports</Link></li>
          </ul>
        </div> */}

        {/* Contact & Newsletter */}
        <div className="footer-section">
          <h3 className="footer-heading">Stay Informed</h3>
          <div className="contact-info">
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 News Street, Media City</p>
            <p><FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@theawaz.com</p>
          </div>
          {/* <div className="newsletter">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button className="subscribe-btn">Subscribe</button>
          </div> */}
        </div>
      </div>

 
      <div className="footer-bottom">
        <p>© 2025 TheAwaz. All rights reserved. | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Use</Link></p>
      </div>
    </footer>
  );
};

export default Footer;