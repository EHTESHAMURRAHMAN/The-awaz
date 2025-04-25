import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Reach out for inquiries, suggestions, or collaborations.</p>
      </div>

      <div className="contact-content">
    
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                required
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                required
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

  
        <div className="contact-info">
          <div className="info-card">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h3>Visit Us</h3>
                <p>123 News Street<br />Media City, MC 4567</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567<br />Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h3>Email Us</h3>
                <p>contact@theawaz.com<br />support@theawaz.com</p>
              </div>
            </div>

          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>

          <div className="map-container">
            <iframe
              title="office-location"
              src="https://maps.google.com/maps?q=media%20city&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{border:0}}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;