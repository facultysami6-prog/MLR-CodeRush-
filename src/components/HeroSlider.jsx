import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronUp, ChevronDown, Sparkles, Leaf } from 'lucide-react';

export default function HeroSlider({ onExploreClick }) {
  const heroItems = [
    {
      id: 0,
      badge: '100% ORGANIC FOODS',
      title: 'Fresh Foods & Veggies You Cook ',
      highlightWord: 'Healthy',
      desc: 'Morbi eget congue lectus. Donec eleifend ultricies urna et euismod. Sed consectetur tellus eget odio aliquet, vel vestibulum tellus.',
      btnText: 'Explore Markets →',
      image: 'https://pngimg.com/d/cherry_PNG3078.png',
      fallbackImage: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
      thumbName: 'Organic Cherries',
      thumbSub: '100% Organic'
    },
    {
      id: 1,
      badge: 'FRESH FROM OUR FARM',
      title: 'Trusted Organic Food Store ',
      highlightWord: 'Conscious',
      desc: 'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.',
      btnText: 'Discover Produce →',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      thumbName: 'Organic Cabbage',
      thumbSub: 'Farm Fresh'
    },
    {
      id: 2,
      badge: 'SEASONAL HARVEST PICKS',
      title: 'Eat Fresh, Support Local ',
      highlightWord: 'Farmers',
      desc: 'Connect directly with neighborhood growers, discover open market schedules, and bookmark seasonal recipes.',
      btnText: 'Find Open Today →',
      image: 'https://images.unsplash.com/photo-1447175008436-0841709069d0?auto=format&fit=crop&w=800&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1447175008436-0841709069d0?auto=format&fit=crop&w=800&q=80',
      thumbName: 'Heirloom Carrots',
      thumbSub: 'Pesticide-Free'
    },
    {
      id: 3,
      badge: 'eGREEN BASKET INITIATIVE',
      title: 'Farm-To-Table Local ',
      highlightWord: 'Community',
      desc: 'Discover neighborhood produce stalls with real-time hours, maps, and instant AI guidance.',
      btnText: 'Explore Directory →',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      thumbName: 'Alpine Strawberries',
      thumbSub: 'Sweet Harvest'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % heroItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + heroItems.length) % heroItems.length);
  };

  const current = heroItems[activeIndex];

  return (
    <section className="organi-hero-section" id="home">
      <div className="organi-hero-container">
        {/* Left Hero Content */}
        <div className="hero-text-content">
          <span className="hero-pill-badge">{current.badge}</span>

          <h1 className="hero-main-title">
            {current.title}
            <span className="hero-highlight-word">{current.highlightWord}</span>
          </h1>

          <p className="hero-description">{current.desc}</p>

          <button
            className="btn-organi-pill"
            onClick={() => {
              const el = document.getElementById('markets');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>{current.btnText}</span>
          </button>
        </div>

        {/* Center Floating Graphic */}
        <div className="hero-center-graphic">
          <img
            key={current.id}
            src={current.image}
            onError={(e) => { e.target.src = current.fallbackImage; }}
            alt={current.thumbName}
            className="floating-hero-img"
          />
        </div>

        {/* Right Vertical Interactive Thumbnail Slider */}
        <div className="hero-vertical-slider">
          <button className="slider-arrow-btn" onClick={handlePrev} title="Previous Item">
            <ChevronUp size={20} />
          </button>

          {heroItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.id}
                className={`slider-thumb-item ${isActive ? 'active-thumb' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <img
                  src={item.image}
                  onError={(e) => { e.target.src = item.fallbackImage; }}
                  alt={item.thumbName}
                  className="thumb-img"
                />
                <div>
                  <div className="thumb-title">{item.thumbName}</div>
                  <div className="thumb-sub">{item.thumbSub}</div>
                </div>
              </div>
            );
          })}

          <button className="slider-arrow-btn" onClick={handleNext} title="Next Item">
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
