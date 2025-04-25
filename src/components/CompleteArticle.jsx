// src/components/CompleteArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faTag, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Article.css';

function CompleteArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://newsweb-9.onrender.com/admin/dashboard/article/${id}`);
        if (!res.ok) throw new Error('Failed to fetch article');
        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <p>Loading Article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>⚠️ Error Loading Article</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="empty-state">
        <h2>Article Not Found</h2>
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="article-container">
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to News
      </Link>

      <header className="article-header">
        <div className="article-meta">
          <span className="category-badge">
            <FontAwesomeIcon icon={faTag} /> {article.category}
          </span>
          <time className="article-date">
            <FontAwesomeIcon icon={faClock} /> {formatDate(article.createdAt)}
          </time>
        </div>
        <h1 className="article-title">{article.title}</h1>
      </header>

      {article.image && (
        <figure className="article-hero">
          <img
            src={`https://newsweb-9.onrender.com/uploads/${article.image}`}
            alt={article.title}
            loading="lazy"
          />
        </figure>
      )}

      <section className="article-content">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <div className="article-footer">
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to News
        </Link>
      </div>
    </article>
  );
}

export default CompleteArticle;