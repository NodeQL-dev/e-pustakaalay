import React, { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const carouselRef = useRef(null);
  
  useEffect(() => {
    // Import Bootstrap's JS only when component mounts
    const bootstrapImport = async () => {
      try {
        // Dynamic import of bootstrap
        const bootstrap = await import('bootstrap');
        
        // Initialize carousel with options
        if (carouselRef.current) {
          new bootstrap.Carousel(carouselRef.current, {
            interval: 5000,
            ride: 'carousel',
            wrap: true
          });
        }
      } catch (err) {
        console.error("Failed to initialize carousel:", err);
      }
    };
    
    bootstrapImport();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div ref={carouselRef} id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators custom-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-image-container">
              <img
                src="https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/banner1.webp"
                alt="Explore our collection"
                className="carousel-image"
              />
            </div>
            <div className="carousel-caption custom-caption">
              <h2>Discover Knowledge</h2>
              <p>Access thousands of books for your educational journey</p>
              <div className="caption-buttons">
                <a href="#features" className="btn-primary">Explore Categories</a>
                <a href="#request-book" className="btn-secondary">Request Book</a>
              </div>
            </div>
          </div>
          
          <div className="carousel-item">
            <div className="carousel-image-container">
              <img
                src="https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/banner2.webp"
                alt="Welcome to E-Pustakaalay"
                className="carousel-image"
              />
            </div>
            <div className="carousel-caption custom-caption">
              <h2>Welcome to E-Pustakaalay</h2>
              <p>Your digital library for academic excellence</p>
              <div className="caption-buttons">
                <a href="#features" className="btn-primary">Explore Categories</a>
                <a href="#request-book" className="btn-secondary">Request Book</a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev custom-control" type="button" aria-label="Previous" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="control-icon">
            <i className="fas fa-chevron-left"></i>
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next custom-control" type="button" aria-label="Next" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="control-icon">
            <i className="fas fa-chevron-right"></i>
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      {/* Hero Features Preview */}
      <div className="hero-features">
        {/* Features content */}
        <div className="hero-feature">
          <i className="fas fa-book-open feature-icon"></i>
          <div>
            <h3>Vast Collection</h3>
            <p>Access to thousands of educational books</p>
          </div>
        </div>
        <div className="hero-feature">
          <i className="fas fa-mobile-alt feature-icon"></i>
          <div>
            <h3>Read Anywhere</h3>
            <p>Access on any device, anytime</p>
          </div>
        </div>
        <div className="hero-feature">
          <i className="fas fa-graduation-cap feature-icon"></i>
          <div>
            <h3>Academic Focus</h3>
            <p>Specialized for students and learners</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;