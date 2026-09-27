import React from 'react';
import './css/BestTrendingCards.css'

export default function BestTrendingCards() {
  const allCards = [
    {
      id: 1,
      classType: 'promo-card-teal',
      chip: 'Get Every Vegetable You Need',
      title: 'Fresh Farm Produce',
      btnText: 'SHOP NOW',
      image: '/assets/fruit-basket-hero.png'
    },
    {
      id: 2,
      classType: 'promo-card-orange',
      chip: 'Get Every Vegetable You Need',
      title: 'Organic Harvest Basket',
      btnText: 'SHOP NOW',
      image: '/assets/basket image.jpg'
    },
    {
      id: 3,
      classType: 'promo-card-lime',
      chip: 'Get Every Vegetable You Need',
      title: 'Green Veggie Mix',
      btnText: 'SHOP NOW',
      image: '/assets/mix vegies image.jpg'
    }
  ];

  return (
    <section className="best-trending-section" id="trending">
      <div className="trending-arch-bg"></div>

      <div className="trending-container">
        <div className="section-head-title">
          <h2 className="section-main-heading">Best Trending</h2>
        </div>

        <div className="carousel-wrapper-relative">
          <div className="trending-cards-grid-large">
            {allCards.map(card => (
              <div key={card.id} className={`promo-card-large ${card.classType}`}>
                <div className="promo-card-content">
                  <div className="promo-card-chip">{card.chip}</div>
                  <h3 className="promo-card-title-large">{card.title}</h3>
                  <button
                    className="btn-promo-shop-large"
                    onClick={() => {
                      const el = document.getElementById('produce');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>{card.btnText}</span>
                    <span className="shop-arrow">→</span>
                  </button>
                </div>

         
                <div className="promo-card-visual">
                  <div className="orbit-sun-glow"></div>
                  <div className="orbit-track-ring">
                    <div className="orbit-planet-dot"></div>
                    <div className="orbit-planet-dot-2"></div>
                  </div>
                  <div className="orbit-basket-wrapper">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="orbit-basket-img"
                      onError={(e) => {
                        e.target.src = '/assets/basket image.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
