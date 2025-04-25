// src/components/AdminCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminCarousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCarouselItems = async () => {
    try {
      const res = await fetch('https://newsweb-9.onrender.com/admin/dashboard/carousel');
      if (!res.ok) throw new Error('Failed to fetch carousel items');
      const data = await res.json();
      setCarouselItems(data.carousel || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://newsweb-9.onrender.com/admin/dashboard/carousel/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete carousel item');
      alert(data.message);
      fetchCarouselItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setMessage('');
  };

  const handleInputChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditingItem({ ...editingItem, newImage: e.target.files[0] });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editingItem.title);
    formData.append('caption', editingItem.caption);
    if (editingItem.newImage) {
      formData.append('image', editingItem.newImage);
    }
    try {
      const res = await fetch(`https://newsweb-9.onrender.com/admin/dashboard/carousel/${editingItem._id}`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update carousel item');
      setMessage(data.message);
      setEditingItem(null);
      fetchCarouselItems();
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (loading) return <div>Loading carousel items...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Manage Carousel Items</h2>

   
      <Link to="/admin/dashboard/carousel/add">
        <button style={{ marginBottom: '1rem' }}>Add New Carousel Item</button>
      </Link>

      {carouselItems.length === 0 ? (
        <p>No carousel items found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {carouselItems.map(item => (
            <li key={item._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              {editingItem && editingItem._id === item._id ? (
                <form onSubmit={handleUpdateSubmit}>
                  <input 
                    type="text" 
                    name="title" 
                    value={editingItem.title} 
                    onChange={handleInputChange} 
                    placeholder="Title" 
                    required 
                  />
                  <input 
                    type="text" 
                    name="caption" 
                    value={editingItem.caption} 
                    onChange={handleInputChange} 
                    placeholder="Caption" 
                    required 
                  />
                  <input 
                    type="file" 
                    name="image" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                  />
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
                  {message && <p>{message}</p>}
                </form>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  {item.image && (
                    <img 
                      src={`https://newsweb-9.onrender.com/uploads/${item.image}`} 
                      alt={item.title} 
                      style={{ width: '200px', height: 'auto' }}
                    />
                  )}
                  <p>{item.caption}</p>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminCarousel;
