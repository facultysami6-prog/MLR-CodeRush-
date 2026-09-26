import React from 'react';

export default function CategoryShowcase({ onSelectCategory }) {
  const categories = [
    { name: 'Fresh Fruits', icon: '🍎', count: '42 Products', type: 'Fresh Fruits' },
    { name: 'Organic Veggies', icon: '🥕', count: '58 Products', type: 'Organic Vegetables' },
    { name: 'Cold Juices', icon: '🧃', count: '16 Products', type: 'Fresh Juices' },
    { name: 'Exotic Herbs', icon: '🌿', count: '24 Products', type: 'Exotic Herbs' },
    { name: 'Dairy & Cheese', icon: '🧀', count: '31 Products', type: 'Dairy & Cheese' },
    { name: 'Dried Nuts', icon: '🌰', count: '19 Products', type: 'Dried Fruits & Nuts' }
  ];

  return (
    <section className="page-section bg-white">
      <div className="section-head-title">
        <span className="section-tagline">Fresh Produce Categories</span>
        <h2 className="section-main-heading">Explore What's In Season</h2>
      </div>

      <div className="categories-flex-grid">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="category-pill-card"
            onClick={() => {
              onSelectCategory(cat.type);
              const el = document.getElementById('produce');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="category-icon-circle">
              <span>{cat.icon}</span>
            </div>
            <div className="category-card-name">{cat.name}</div>
            <div className="category-card-count">{cat.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
