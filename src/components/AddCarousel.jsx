// src/components/AddCarousel.jsx
import React, { useState } from 'react';

function AddCarousel() {
  const [carouselData, setCarouselData] = useState({
    title: '',
    caption: '',
    image: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCarouselData({
      ...carouselData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCarouselData({
      ...carouselData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('title', carouselData.title);
    formData.append('caption', carouselData.caption);
    if (carouselData.image) {
      formData.append('image', carouselData.image);
    }

    try {
      const response = await fetch('https://newsweb-9.onrender.com/admin/dashboard/carousel', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Failed to add carousel item');
      } else {
        setMessage('Carousel item added successfully!');
  
        setCarouselData({ title: '', caption: '', image: null });
      }
    } catch (error) {
      console.error('Error adding carousel item:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Add New Carousel Item</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Carousel Title"
          value={carouselData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="caption"
          placeholder="Carousel Caption"
          value={carouselData.caption}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Add Carousel Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddCarousel;
