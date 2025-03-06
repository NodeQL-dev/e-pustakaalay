import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './BookCarousel.css';

const BookCarousel = ({ category, title }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, 'Books');
        const querySnapshot = await getDocs(booksCollection);

        const fetchedBooks = [];
        querySnapshot.forEach((doc) => {
          const bookData = doc.data();
          // Filter books by category if a category is provided
          if (!category || bookData.Category === category) {
            fetchedBooks.push({
              id: doc.id,
              ...bookData
            });
          }
        });

        setBooks(fetchedBooks.slice(0, 15)); // Limit to 15 books
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };

  // Generate a unique key for URL parameters
  const generateUniqueKey = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const formatTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className='containerBook'>
      <div className="carousel-section">
        <div className="carousel-header">
          <div className="carousel-title">
            <div className="carousel-title-indicator"></div>
            <h2>{title || 'Books'}</h2>
          </div>
          <div className="carousel-view-all">
            <a href={`/book?id=${title?.toLowerCase()}`}>
              VIEW ALL
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>

        <div className="carousel-container">
          <button
            className="carousel-nav-btn prev-btn"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="carousel-track" ref={containerRef}>
            {loading ? (
              // Shimmer loading effect for books
              Array(8).fill().map((_, index) => (
                <div className="book-card-skeleton" key={`skeleton-${index}`}>
                  <div className="book-image-skeleton"></div>
                  <div className="book-title-skeleton"></div>
                  <div className="book-button-skeleton"></div>
                  <div className="shimmer-effect"></div>
                </div>
              ))
            ) : (
              // Book cards
              books.map((book, index) => (
                <div
                  className="book-card"
                  key={book.id || index}
                  onMouseEnter={() => setIsHovering(book.id)}
                  onMouseLeave={() => setIsHovering(null)}
                  style={{ backgroundColor: book.BgColor }}
                >
                  <div className="book-image-container">
                    <img
                      src={book.Image}
                      alt={book.Title}
                      className="book-image"
                      loading="lazy"
                    />
                    {isHovering === book.id && (
                      <div className="book-overlay">
                        <a
                          href={`/viewer/book/${formatTitle(book.Title)}/${book.Cnum || book.id}`}
                          className="quick-view-btn"
                        >
                          Quick View
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="book-info">
                    <h3 className="book-title" style={{ color: book.TxtColor }} title={book.Title}>{book.Title}</h3>
                    <a
                      href={`/viewer/book/${formatTitle(book.Title)}/${book.Cnum || book.id}`}
                      className="view-book-btn"
                    >
                      View Book
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className="carousel-nav-btn next-btn"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;