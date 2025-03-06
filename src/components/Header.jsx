import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll event to add shadow and background to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Navigate to search page when search button is clicked
  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/logo.png"
              alt="E-Pustakaalay Logo"
              className="logo-image"
              loading="lazy"
            />
            <h1 className="site-title">E-Pustakaalay</h1>
          </Link>
        </div>

        <div className="header-actions">
          <button
            className="search-button"
            onClick={handleSearchClick}
            aria-label="Go to search"
          >
            <img
              src="https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/Search.png"
              alt="Search"
              className="search-icon"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;