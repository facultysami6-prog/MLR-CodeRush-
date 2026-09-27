import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './css/PopularCategoriesCircular.css';

export default function PopularCategoriesCircular({ onSelectCategory }) {
  const allItems = [
    { title: 'Fresh Tomatoes', type: 'Premium Tomatoes', image: '/assets/tomato image.jpg' },
    { title: 'Spinach Harvest', type: 'Leafy Greens', image: '/assets/spinach image.jpg' },
    { title: 'Farm Beetroot', type: 'Root Vegetables', image: '/assets/beetroot image.jpg' },
    { title: 'Green Capsicum', type: 'Fresh Capsicum', image: '/assets/capsicum image.jpg' },
    { title: 'Fresh Potatoes', type: 'Organic Vegetables', image: '/assets/fresh potato.jpg' },
    { title: 'Organic Basket', type: 'Organic Vegetables', image: '/assets/basket image.jpg' },
    { title: 'Garden Mix', type: 'Fresh Veg Mix', image: '/assets/mix vegies image.jpg' }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(prev => (prev + 1) % (allItems.length - 4));
  };

  const handlePrev = () => {
    setStartIndex(prev => (prev - 1 + (allItems.length - 4)) % (allItems.length - 4));
  };

  const visibleItems = allItems.slice(startIndex, startIndex + 5);
  const tickerItems = [...visibleItems, ...visibleItems];

  return (
    <section className="good-harvest-leaves-section" id="popular-categories">
      <div className="good-harvest-overlay"></div>

      <div className="good-harvest-content">
         <div className="section-head-title">
          <h2 className="section-main-heading">Good Large Harvest</h2>
        </div>

      
        <div className="carousel-wrapper-relative max-w-6xl mx-auto">
          <button
            className="carousel-nav-btn btn-arrow-left"
            onClick={handlePrev}
            title="Previous Categories"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="circular-cat-marquee w-full">
            <div className="circular-cat-track">
              {tickerItems.map((cat, idx) => (
                <div
                  key={`${cat.title}-${idx}`}
                  className="circular-cat-item"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(cat.type);
                  }}
                >
                  <div className="circular-img-box">
                    <img src={cat.image} alt={cat.title} />
                  </div>
                  <div className="circular-pill-badge">{cat.title}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-nav-btn btn-arrow-right"
            onClick={handleNext}
            title="Next Categories"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
