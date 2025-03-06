import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../components/firebase';
import './Book.css';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(null);
  const { id } = useParams(); // Get category ID from URL params

  // Mapping from URL id to Firestore Category
  const idToCategoryMap = {
    'jee': 'JEEM-EP',
    'cbse': 'CBSE-EP',
    'neetu': 'NEETU-EP',
    'neeta': 'NEETA-EP',
    'icse': 'ICSE-EP',
    'gate': 'GATE-EP',
    'nda': 'NDA-EP',
    'ssb': 'SSB-EP',
    'ssc': 'SSC-EP',
    'cat': 'CAT-EP',
    'clat': 'CLAT-EP',
    'openl': 'OPENL-EP',
    'dgca': 'DGCA-EP',
    // Add more mappings as needed based on your categories
  };

  // Get category title from ID
  const getCategoryTitle = () => {
    switch (id?.toLowerCase()) {
      case 'jee': return 'JEE Books';
      case 'cbse': return 'CBSE Books';
      case 'neetu': return 'NEET UG Books';
      case 'neeta': return 'NEET All Books';
      case 'icse': return 'ICSE Books';
      case 'gate': return 'GATE Books';
      case 'nda': return 'NDA Books';
      case 'ssb': return 'SSB Books';
      case 'ssc': return 'SSC Books';
      case 'cat': return 'CAT Books';
      case 'clat': return 'CLAT Books';
      case 'openl': return 'Open Library Books';
      case 'dgca': return 'DGCA Books';
      default: return 'All Books';
    }
  };

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      setIsLoading(true);
      try {
        const category = idToCategoryMap[id?.toLowerCase()] || '';
        let querySnapshot;

        // If a category is specified, filter by Category field; otherwise, fetch all books
        if (category) {
          const q = query(collection(db, 'Books'), where('Category', '==', category));
          querySnapshot = await getDocs(q);
        } else {
          querySnapshot = await getDocs(collection(db, 'Books'));
        }

        // Map Firestore documents to book objects
        const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [id]); // Re-fetch when category ID changes

  const formatTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className='containerBook'>
      <div className="book-page-container">
        <div className="category-header">
          <div className="category-title">
            <div className="category-line"></div>
            <h2>{getCategoryTitle()}</h2>
          </div>
          <p className="books-count">{books.length} books available</p>
        </div>

        {isLoading && (
          <div className="loading-container">
            <div className="circular-loader"></div>
          </div>
        )}

        {!isLoading && books.length === 0 && (
          <div className="no-books-message">
            <h3>No books found for this category.</h3>
            <p>Try exploring other categories or check back later.</p>
          </div>
        )}

        {!isLoading && books.length > 0 && (
          <div className="books-grid">
            {books.map((book) => (
              <div
                className="book-card"
                key={book.id}
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
                  <h3 className="book-title" style={{ color: book.TxtColor }} title={book.Title}>
                    {book.Title}
                  </h3>
                  <a
                    href={`/viewer/book/${formatTitle(book.Title)}/${book.Cnum || book.id}`}
                    className="view-book-btn"
                  >
                    View Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;