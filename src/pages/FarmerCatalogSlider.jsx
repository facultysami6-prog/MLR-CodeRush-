import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './css/FarmerCatalogSlider.css';
import catalogData from '../data/catalog.json';

export default function FarmerCatalogSlider({
  catalog,
  onSelectItem,
  onSelectCategory
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('next');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cardsList =
    Array.isArray(catalog) && catalog.length > 0
      ? catalog
      : catalogData;

  const total = cardsList.length;



  useEffect(() => {
    if (total === 0 || isHovered) return;

    const interval = setInterval(() => {
      setDirection('next');

      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(interval);
  }, [total, isHovered]);


  const getCardPosition = useCallback(
    (index) => {
      if (total <= 1) {
        return index === currentIndex
          ? 'catalog-card-center'
          : 'catalog-card-hidden';
      }

      let difference = index - currentIndex;

      if (difference > total / 2) {
        difference -= total;
      }

      if (difference < -total / 2) {
        difference += total;
      }

      if (difference === 0) {
        return 'catalog-card-center';
      }

      if (difference === -1) {
        return 'catalog-card-left-one';
      }

      if (difference === 1) {
        return 'catalog-card-right-one';
      }

      if (difference === -2) {
        return 'catalog-card-left-two';
      }

      if (difference === 2) {
        return 'catalog-card-right-two';
      }

      return 'catalog-card-hidden';
    },
    [currentIndex, total]
  );

  

  const goPrev = useCallback(() => {
    if (total === 0) return;

    setDirection('prev');

    setCurrentIndex((prev) =>
      prev === 0 ? total - 1 : prev - 1
    );
  }, [total]);

  const goNext = useCallback(() => {
    if (total === 0) return;

    setDirection('next');

    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;

    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };



  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      goNext();
    } else {
      goPrev();
    }
  };


  const renderStars = (rating) => {
    const numericRating = Number(rating) || 4.5;

    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(numericRating);

      const half =
        index === Math.floor(numericRating) &&
        numericRating % 1 >= 0.5;

      return (
        <Star
          key={index}
          size={12}
          strokeWidth={1.8}
          className={
            filled
              ? 'catalog-star filled'
              : half
              ? 'catalog-star half'
              : 'catalog-star empty'
          }
          fill={
            filled || half
              ? 'currentColor'
              : 'none'
          }
        />
      );
    });
  };



  if (total === 0) {
    return (
      <div className="catalog-slider-loading">
        <p>Loading Farmer Catalog...</p>
      </div>
    );
  }

  return (
    <section
      className="farmer-catalog-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      <div
        className="catalog-bg-orb catalog-bg-orb-one"
        aria-hidden="true"
      />

      <div
        className="catalog-bg-orb catalog-bg-orb-two"
        aria-hidden="true"
      />

      <div
        className="catalog-bg-line catalog-bg-line-one"
        aria-hidden="true"
      />

      <div
        className="catalog-bg-line catalog-bg-line-two"
        aria-hidden="true"
      />


      <div className="catalog-slider-header">

        <div className="catalog-eyebrow">

          <span className="catalog-eyebrow-line" />

          <span>FRESH FROM OUR FARM</span>

          <span className="catalog-eyebrow-line" />

        </div>

        <h2 className="catalog-main-title">
          Farmer <em>Catalog</em>
        </h2>

        <p className="catalog-header-description">
          Discover fresh produce from local farmers,
          grown with care and delivered to your table.
        </p>

      </div>

      

      <div
        className={`catalog-coverflow-viewport direction-${direction}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >


        <button
          type="button"
          className="catalog-arrow catalog-arrow-left"
          onClick={goPrev}
          aria-label="Previous product"
        >
          <ChevronLeft size={21} />
        </button>

  
        <div className="catalog-card-stage">

          {cardsList.map((item, index) => {

            const positionClass = getCardPosition(index);

            const isCenter = index === currentIndex;

            return (
              <article
                key={item.id || index}
                className={`catalog-product-card ${positionClass}`}
                onClick={() => {

                  if (!isCenter) {
                    goToSlide(index);
                    return;
                  }

                  if (onSelectItem) {
                    onSelectItem(item);
                  }

                  if (onSelectCategory) {
                    onSelectCategory(item.badgeLabel);
                  }
                }}
              >

               

                <div className="catalog-card-media">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="catalog-card-image"
                  />

                  <div className="catalog-card-image-overlay" />

                  <div className="catalog-card-top-glow" />

                
                  {item.badgeLabel && (
                    <span className="catalog-category-badge">
                      {item.badgeLabel}
                    </span>
                  )}

               
                  {item.discount && (
                    <span className="catalog-discount-badge">
                      {item.discount}
                    </span>
                  )}

             
                  <span className="catalog-card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                </div>

                

                <div className="catalog-card-sheen" />

            

                <div className="catalog-card-content">

          
                  <div className="catalog-rating-row">

                    <div className="catalog-stars">
                      {renderStars(item.rating || 4.5)}
                    </div>

                    <span className="catalog-rating-number">
                      {item.rating || 4.5}
                    </span>

                  </div>

        
                  <h3 className="catalog-product-title">
                    {item.title}
                  </h3>

             
                  <div className="catalog-farmer-row">

                    <span className="catalog-farm-name">
                      {item.farmName}
                    </span>

                    <span className="catalog-separator">
                      •
                    </span>

                    <span className="catalog-location">
                      {item.location}
                    </span>

                  </div>

                
                  <div className="catalog-price-row">

                    <div className="catalog-price">

                      <span className="catalog-price-current">
                        {item.price}
                      </span>

                      {item.unit && (
                        <span className="catalog-price-unit">
                          / {item.unit}
                        </span>
                      )}

                    </div>

                    {item.originalPrice && (
                      <span className="catalog-price-old">
                        {item.originalPrice}
                      </span>
                    )}

                  </div>
                </div>

              </article>
            );
          })}

        </div>

  
        <button
          type="button"
          className="catalog-arrow catalog-arrow-right"
          onClick={goNext}
          aria-label="Next product"
        >
          <ChevronRight size={21} />
        </button>

      </div>

    

      <div className="catalog-navigation">

        <div className="catalog-dots">

          {cardsList.map((item, index) => (

            <button
              key={item.id || index}
              type="button"
              className={`catalog-dot ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${item.title}`}
            />

          ))}

        </div>

        <span className="catalog-slide-counter">

          {String(currentIndex + 1).padStart(2, '0')}

          <span>/</span>

          {String(total).padStart(2, '0')}

        </span>

      </div>

    </section>
  );
}