// src/components/AllArticles.jsx
import React, { useState, useEffect } from 'react';

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingArticle, setEditingArticle] = useState(null); 
  const [updateMessage, setUpdateMessage] = useState('');

  const fetchArticles = async () => {
    try {
      const response = await fetch('https://newsweb-9.onrender.com/admin/dashboard/all-articles');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data.articles || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://newsweb-9.onrender.com/admin/dashboard/delete-article/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete article');
      }
      alert(data.message);
      fetchArticles();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (article) => {
    setEditingArticle(article);
    setUpdateMessage('');
  };

  const handleUpdateChange = (e) => {
    setEditingArticle({
      ...editingArticle,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFileChange = (e) => {
    setEditingArticle({
      ...editingArticle,
      newImage: e.target.files[0],
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editingArticle.title);
    formData.append('category', editingArticle.category);
    formData.append('content', editingArticle.content);
    if (editingArticle.newImage) {
      formData.append('image', editingArticle.newImage);
    }
    try {
      const response = await fetch(`https://newsweb-9.onrender.com/admin/dashboard/update-article/${editingArticle._id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update article');
      }
      setUpdateMessage(data.message);
      setEditingArticle(null);
      fetchArticles();
    } catch (err) {
      setUpdateMessage(err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading articles...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2>All Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map(article => (
            <li key={article._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              {editingArticle && editingArticle._id === article._id ? (
                <form onSubmit={handleUpdateSubmit}>
                  <input 
                    type="text" 
                    name="title" 
                    value={editingArticle.title} 
                    onChange={handleUpdateChange} 
                    required 
                  />
                  <input 
                    type="text" 
                    name="category" 
                    value={editingArticle.category} 
                    onChange={handleUpdateChange} 
                    required 
                  />
                  <textarea 
                    name="content" 
                    value={editingArticle.content} 
                    onChange={handleUpdateChange} 
                    rows="4" 
                    required 
                  />
                  <input 
                    type="file" 
                    name="image" 
                    onChange={handleUpdateFileChange} 
                    accept="image/*" 
                  />
                  <button type="submit">Update Article</button>
                  <button type="button" onClick={() => setEditingArticle(null)}>Cancel</button>
                  {updateMessage && <p>{updateMessage}</p>}
                </form>
              ) : (
                <>
                  <h3>{article.title}</h3>
                  {article.image && (
                    <img 
                      src={`https://newsweb-9.onrender.com/uploads/${article.image}`} 
                      alt={article.title} 
                      style={{ width: '200px', height: 'auto', marginBottom: '0.5rem' }}
                    />
                  )}
                  <p><strong>Category:</strong> {article.category}</p>
                  <p>{article.content.substring(0, 100)}...</p>
                  <button onClick={() => handleEditClick(article)}>Edit</button>
                  <button onClick={() => handleDelete(article._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllArticles;
