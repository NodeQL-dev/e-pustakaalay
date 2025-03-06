import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import BookCarousel from './components/BookCarousel';
import RequestBook from './components/RequestBook';
import Footer from './components/Footer/Footer';
import SearchPage from './pages/SearchPage/SearchPage';
import Book from './pages/Book/Book';
import BookViewer from './pages/BookViewer/BookViewer';

function App() {

  const categories = [
    { id: "jee", title: "JEE", category: "JEEM-EP" },
    { id: "neet", title: "NEET", category: "NEETU-EP" },
    { id: "cbse", title: "CBSE", category: "CBSE-EP" }
  ];

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Home page */}
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              {/* Book Carousel sections for each category */}
              <section className="book-sections">
                {categories.map(cat => (
                  <BookCarousel
                    key={cat.id}
                    title={cat.title}
                    category={cat.category}
                  />
                ))}
              </section>
              <RequestBook />
            </>
          } />

          {/* Search page */}
          <Route path="/search" element={<SearchPage />} />

          {/* Book category pages with dynamic routing */}
          <Route path="/book/exam/:id" element={<Book />} />

          {/* Fallback route for direct category links (legacy support) */}
          <Route path="/book" element={<Book />} />

          {/* Book viewer routes - with updated structure to include document ID */}
          <Route path="/viewer/book/:bookTitle/:bookId/:documentId" element={<BookViewer />} />

          {/* Legacy support for older route patterns */}
          <Route path="/viewer/book/:bookTitle/:bookId" element={<BookViewer />} />
          <Route path="/viewer" element={<BookViewer />} />

          {/* 404 Page - Not Found */}
          <Route path="*" element={
            <div className="not-found-container">
              <h1>Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <a href="/" className="back-home-btn">Back to Home</a>
            </div>
          } />

        </Routes>
        {/* Footer appears on all pages except BookViewer */}
        <Routes>
          <Route path="/viewer/book/:bookTitle/:bookId/:documentId" element={null} />
          <Route path="/viewer/book/:bookTitle/:bookId" element={null} />
          <Route path="/viewer" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
