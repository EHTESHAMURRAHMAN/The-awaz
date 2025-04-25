// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
    closeMenu();
  };

  const toggleMenu = () => setIsExpanded(!isExpanded);
  const closeMenu = () => setIsExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg bbc-navbar">
      <div className="container-fluid px-lg-4">

        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <span className="brand-first">The</span>
          <span className="brand-second">Awaz</span>
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isExpanded ? faTimes : faBars} />
        </button>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {admin ? (
              <>
                <NavItem to="/admin/dashboard" text="Dashboard" onClick={closeMenu} />
                <NavItem to="/admin/dashboard/add-article" text="New Article" onClick={closeMenu} />
                <NavItem to="/admin/dashboard/all-articles" text="All Articles" onClick={closeMenu} />
                <NavItem to="/admin/dashboard/carousel" text="Carousel" onClick={closeMenu} />
                <NavItem to="/admin/dashboard/carousel/add" text="Add Carousel" onClick={closeMenu} />
              </>
            ) : (
              <>
                <NavItem to="/" text="Home" onClick={closeMenu} />
                <NavItem to="/about" text="About" onClick={closeMenu} />
                <NavItem to="/contact" text="Contact" onClick={closeMenu} />
              </>
            )}
          </ul>

          {/* Right Side Actions */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {(
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle user-menu"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {admin.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/admin/profile" onClick={closeMenu}>
                      Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ to, text, onClick }) => (
  <li className="nav-item" onClick={onClick}>
    <Link className="nav-link" to={to}>
      {text}
    </Link>
  </li>
);

export default Navbar;