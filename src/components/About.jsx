import React from 'react';
import '../styles/About.css';

// Import placeholder images
import teamImage from '../assets/r2.jpg';
import reporter1 from '../assets/r1.jpg';
import reporter2 from '../assets/r4.jpg';
import reporter3 from '../assets/r3.jpg';

const About = () => {
  return (
    <div className="about-container">
    
      <section className="about-hero">
        <div className="hero-content">
          <h1>Truth in Every Story</h1>
          <p className="hero-subtext">Bringing clarity to a complex world since 2010</p>
        </div>
        <div className="hero-image-container">
          <img src={teamImage} alt="Newsroom team" className="hero-image" />
        </div>
      </section>

     
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p className="mission-text">
            At The Awaz, we believe in journalism that illuminates rather than inflames. 
            Our team of dedicated reporters works tirelessly to bring you verified, 
            contextualized news that matters.
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <h3>13+</h3>
              <p>Years of Service</p>
            </div>
            <div className="stat-item">
              <h3>50k+</h3>
              <p>Articles Published</p>
            </div>
            <div className="stat-item">
              <h3>150+</h3>
              <p>Awards Won</p>
            </div>
          </div>
        </div>
      </section>


      <section className="team-section">
        <h2>Meet Our Leaders</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={reporter1} alt="Editor-in-Chief" />
            <h3>Sarah Johnson</h3>
            <p>Editor-in-Chief</p>
            <div className="member-bio">
              Pulitzer Prize-winning journalist with 20 years of experience
            </div>
          </div>
          <div className="team-member">
            <img src={reporter2} alt="Managing Editor" />
            <h3>Michael Chen</h3>
            <p>Managing Editor</p>
            <div className="member-bio">
              Specializes in investigative journalism and data-driven reporting
            </div>
          </div>
          <div className="team-member">
            <img src={reporter3} alt="Senior Correspondent" />
            <h3>Priya Patel</h3>
            <p>Senior Correspondent</p>
            <div className="member-bio">
              Foreign affairs expert and conflict zone reporter
            </div>
          </div>
        </div>
      </section>

    
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">✓</div>
            <h3>Accuracy First</h3>
            <p>Triple-verified facts from multiple sources</p>
          </div>
          <div className="value-card">
            <div className="value-icon">♻</div>
            <h3>Sustainability</h3>
            <p>Carbon-neutral news operations since 2018</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌍</div>
            <h3>Global Perspective</h3>
            <p>150+ correspondents across 60 countries</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;