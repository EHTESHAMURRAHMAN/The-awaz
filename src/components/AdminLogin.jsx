// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function AdminLogin() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://newsweb-9.onrender.com/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('admin', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <FontAwesomeIcon icon={faUserShield} style={styles.icon} />
          <h1 style={styles.title}>The Awaz</h1>
          <h2 style={styles.subtitle}>Admin Portal</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FontAwesomeIcon icon={faUserShield} style={styles.inputIcon} />
            <input
              type="text"
              name="name"
              placeholder="Admin Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              autoFocus
            />
          </div>

          <div style={styles.inputGroup}>
            <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <FontAwesomeIcon icon={faExclamationCircle} style={styles.errorIcon} />
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <div style={styles.footer}>
          <a href="#forgot-password" style={styles.link}>Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    padding: '20px',
  },
  loginBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    backdropFilter: 'blur(10px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#4f46e5',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#1f2937',
    margin: '0.5rem 0',
    background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '1.1rem',
  },
  input: {
    width: '100%',
    padding: '14px 20px 14px 45px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '14px 20px 14px 45px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
    },
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#4338ca',
      transform: 'translateY(-1px)',
    },
    ':disabled': {
      backgroundColor: '#a5b4fc',
      cursor: 'not-allowed',
    },
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorIcon: {
    fontSize: '1rem',
  },
  errorText: {
    fontSize: '0.9rem',
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default AdminLogin;