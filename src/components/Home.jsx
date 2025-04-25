// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faNewspaper, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Homepage.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_ENDPOINT = 'https://newsweb-9.onrender.com/admin/dashboard/all-articles';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        
      
        const sortedArticles = (data.articles || []).sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setArticles(sortedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p>Loading latest news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>⚠️ Error Loading Content</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="page-header">
        <h1>
          <FontAwesomeIcon icon={faNewspaper} />
          Latest News
        </h1>
        <div className="header-divider" />
      </div>

      {articles.length === 0 ? (
        <div className="empty-state">
          <h2>No Articles Found</h2>
          <p>Check back later for updates</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <article key={article._id} className="article-card">
              {article.image && (
                <div className="article-image">
                  <img
                    src={`https://newsweb-9.onrender.com/uploads/${article.image}`}
                    alt={article.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="article-content">
                <div className="article-meta">
                  <span className="category-badge">{article.category}</span>
                  <time className="article-date">
                    <FontAwesomeIcon icon={faClock} />
                    {formatDate(article.createdAt)}
                  </time>
                </div>
                <h3>{article.title}</h3>
                <p className="article-excerpt">
                  {article.content.substring(0, 150)}
                  {article.content.length > 150 && '...'}
                </p>
                <Link to={`/article/${article._id}`} className="read-more-btn">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;