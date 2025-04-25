
import React, { useState } from 'react';

function AddArticle() {
  const [articleData, setArticleData] = useState({
    title: '',
    category: '',
    content: '',
    image: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setArticleData({
      ...articleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setArticleData({
      ...articleData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    

    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('category', articleData.category);
    formData.append('content', articleData.content);
    if (articleData.image) {
      formData.append('image', articleData.image);
    }

    try {
      const response = await fetch('https://newsweb-9.onrender.com/admin/dashboard/add-article', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Failed to add article');
      } else {
        setMessage('Article added successfully!');
     
        setArticleData({ title: '', category: '', content: '', image: null });
      }
    } catch (error) {
      console.error('AddArticle error:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Add New Article</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={articleData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={articleData.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Article Content"
          value={articleData.content}
          onChange={handleChange}
          rows={6}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Add Article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddArticle;
