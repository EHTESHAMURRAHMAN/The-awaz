import React, { useEffect, useState } from 'react';

function Carousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


  const cardWidth = 300;
  const cardHeight = 180;

 
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const minSwipeDistance = 50;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    
 
    setTouchStart(0);
    setTouchEnd(0);
  };


  const sliderContainerStyle = {
    display: 'flex',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    width: `${carouselItems.length * cardWidth}px`,
    transform: `translateX(-${currentSlide * cardWidth}px)`,
    touchAction: 'pan-y'
  };

 
  const cardStyle = {
    position: 'relative',
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    flexShrink: 0,
    margin: '0 10px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  };


  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  };


  const sliderWrapperStyle = {
    position: 'relative',
    overflow: 'hidden',
    marginTop: '30px'
  };


  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#4a5568',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'white',
      transform: 'translateY(-50%) scale(1.1)'
    }
  };

 
  const overlayStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    color: 'white',
    padding: '16px',
    boxSizing: 'border-box'
  };


  const titleStyle = {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '500',
    lineHeight: '1.4',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
  };


  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const res = await fetch('https://newsweb-9.onrender.com/admin/dashboard/carousel');
        if (!res.ok) throw new Error('Failed to fetch carousel data');
        const data = await res.json();
        setCarouselItems(data.carousel || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? carouselItems.length - 1 : prev - 1));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5002);
    return () => clearInterval(interval);
  }, [carouselItems, currentSlide]);

  if (loading) return <div className="loading">Loading carousel data...</div>;
  if (error) return <div className="error" style={{ color: '#dc2626' }}>{error}</div>;
  if (!carouselItems.length) return <div className="empty">No carousel items available</div>;

  return (
    <section style={{ padding: '60px 0', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '30px',
          color: '#1a202c',
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }}>
          Breaking News
        </h2>
        
        <div style={sliderWrapperStyle}>
          <button 
            onClick={prevSlide} 
            style={{ ...navButtonStyle, left: '20px' }}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            style={sliderContainerStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carouselItems.map((item, index) => (
              <div key={item._id || index} style={cardStyle}>
                <img
                  src={`https://newsweb-9.onrender.com/uploads/${item.image}`}
                  alt={item.title}
                  style={imageStyle}
                  loading="lazy"
                />
                <div style={overlayStyle}>
                  <h3 style={titleStyle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextSlide} 
            style={{ ...navButtonStyle, right: '20px' }}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carousel;