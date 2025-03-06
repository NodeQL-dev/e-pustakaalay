import React, { useState, useRef, useEffect } from 'react';
import './Features.css';

function Features() {
    const [activeCategory, setActiveCategory] = useState(null);
    const containerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const categories = [
        { id: "icse", name: "ICSE", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/icse.jpg", disabled: false },
        { id: "cbse", name: "CBSE", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/cbse.jpg", disabled: false },
        { id: "jee", name: "JEE", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/neet.png", disabled: false },
        { id: "neet", name: "NEET", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/neet.png", disabled: false },
        { id: "gate", name: "GATE", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/GATE.png", disabled: true },
        { id: "nda", name: "NDA", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/nda.jpg", disabled: true },
        { id: "ssb", name: "SSB", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/ssb.png", disabled: true },
        { id: "ssc", name: "SSC", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/ssc.jpg", disabled: true },
        { id: "cat", name: "CAT", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/cat.jpg", disabled: true },
        { id: "clat", name: "CLAT", imgSrc: "https://67c3d0b132682489e1c451c8--whimsical-eclair-9b90f9.netlify.app/Image/clat.jpg", disabled: true },
    ];

    // Function to check scroll position and update arrow visibility
    const checkScrollPosition = () => {
        if (!containerRef.current) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    // Add scroll event listener
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Check initial state
            checkScrollPosition();
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    const handleCategoryHover = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <section id="features" className="features-section section">
            <div className="features-heading">
                <h2>Explore Categories</h2>
                <p>Browse our collection of educational materials by category</p>
            </div>
            
            <div className="category-wrapper">
                {showLeftArrow && (
                    <button 
                        className="scroll-arrow scroll-left"
                        onClick={scrollLeft}
                        aria-label="Scroll left"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                )}
                
                <div className="category-container" ref={containerRef}>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`category-item ${category.disabled ? "disabled" : ""} ${activeCategory === category.id ? "active" : ""}`}
                            onMouseEnter={() => handleCategoryHover(category.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <a
                                href={category.disabled ? "#" : `/book/exam/${category.id}`}
                                onClick={(e) => category.disabled && e.preventDefault()}
                                aria-disabled={category.disabled}
                            >
                                <div className="category-image">
                                    <img src={category.imgSrc} alt={`${category.name} Exam Logo`} loading="lazy" />
                                </div>
                                <p>{category.name}</p>
                                {!category.disabled && (
                                    <span className="explore-tag">Explore</span>
                                )}
                                {category.disabled && (
                                    <span className="coming-soon-tag">Coming Soon</span>
                                )}
                            </a>
                        </div>
                    ))}
                </div>
                
                {showRightArrow && (
                    <button 
                        className="scroll-arrow scroll-right"
                        onClick={scrollRight}
                        aria-label="Scroll right"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                )}
            </div>
        </section>
    );
}

export default Features;