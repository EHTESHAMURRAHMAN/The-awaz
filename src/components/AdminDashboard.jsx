// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faNewspaper, faChartLine, faUserCog, faCertificate, faFan } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
  
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="brand-heading">
            <span className="gradient-text">The Awaz</span>
            <span className="welcome-text">Welcome back, Danish</span>
          </h1>
        </header>

        <div className="dashboard-grid">
       
          <Link to="/admin/dashboard/add-article" className="dashboard-card action-card primary">
            <FontAwesomeIcon icon={faPlusCircle} className="card-icon" />
            <div className="card-content">
              <h3>Create New Article</h3>
              <p>Publish fresh content for your readers</p>
            </div>
          </Link>

          <Link to="/admin/dashboard/all-articles" className="dashboard-card action-card secondary">
            <FontAwesomeIcon icon={faNewspaper} className="card-icon" />
            <div className="card-content">
              <h3>Manage Articles</h3>
              <p>Edit, update or remove existing content</p>
            </div>
          </Link>

          <div className="dashboard-card analytics-card">
            <div className="card-header">
              <FontAwesomeIcon icon={faChartLine} />
              <h3>Content Analytics</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">400</span>
                <span className="stat-label">Total Posts</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-value">40</span>
                <span className="stat-label">Pending Reviews</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '30%'}}></div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-value">Min. 1</span>
                <span className="stat-label">Daily Target</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '90%'}}></div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-value">400</span>
                <span className="stat-label">Active Users</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card profile-card">
            <div className="card-header">
              <FontAwesomeIcon icon={faUserCog} />
              <h3>Account Overview</h3>
            </div>
            <div className="user-info">
              <div className="user-badge">
                <span className="user-name">Danish</span>
                <span className="user-role">Super Admin</span>
              </div>
              <div className="user-metrics">
                <div className="metric-item">
                  <FontAwesomeIcon icon={faCertificate} />
                  <div className="metric-content">
                    <span className="metric-value">400</span>
                    <span className="metric-label">Warr Length</span>
                  </div>
                </div>
                <div className="metric-item">
                  <FontAwesomeIcon icon={faFan} />
                  <div className="metric-content">
                    <span className="metric-value">5.8 kW</span>
                    <span className="metric-label">Wind Power</span>
                  </div>
                </div>
              </div>
              <button className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
 
    </div>
    
  );
}

export default AdminDashboard;