import React from 'react';

export default function CircularProductFeature() {
  return (
    <section className="model-feature-wrapper">
      {/* Centered Heading */}
      <div className="section-head-title">
        <h2 className="section-main-heading">Fresh Produce Feature</h2>
      </div>

      <div className="model-feature-grid">
        {/* Left Side Content (Aligned Right) */}
       {/* Left Side Content */}
<div className="feature-side-content feature-side-left">

<div className="feature-text-block">
  <div className="feature-label">
    <span className="feature-dot"></span>
    <span>WHAT'S INSIDE</span>
  </div>

  <h4>Fresh Ingredients</h4>

  <p>
    100% certified organic harvest featuring farm-fresh grapes,
    oranges, lemons and seasonal greens.
  </p>
</div>

<div className="feature-text-block">
  <div className="feature-label">
    <span className="feature-dot"></span>
    <span>STORAGE GUIDE</span>
  </div>

  <h4>Keep It Fresh</h4>

  <p>
    Store in cool and dry conditions. Refrigerate when needed
    to preserve natural vitamins, freshness and flavour.
  </p>
</div>

</div>

        {/* Center Circular Showcase (Matching Model Image 1 with Outer Green Ring & 4 Surrounding Mini Nodes) */}
        <div className="feature-hub-ring-container" title="100% Organic Fresh Produce Hub">
          {/* Top-Left Mini Circular Node */}
          <div className="mini-node node-top-left" title="Organic Veggies">
            <img src="/assets/mix vegies image.jpg" alt="Veggies" />
          </div>

          {/* Bottom-Left Mini Circular Node */}
          <div className="mini-node node-bottom-left" title="Fresh Tomatoes">
            <img src="/assets/tomato image.jpg" alt="Tomatoes" />
          </div>

          {/* Center Main Circular Frame containing Image 3 (Fruit Basket) */}
          <div className="feature-hub-inner-circle">
            <img
              src="/assets/fruit-basket-hero.png"
              alt="Fresh Organic Fruit Basket"
              className="hover:scale-108 transition-transform duration-500"
            />
          </div>

          {/* Top-Right Mini Circular Node */}
          <div className="mini-node node-top-right" title="Fresh Strawberries">
            <img src="/assets/straberry image.jpg" alt="Strawberries" />
          </div>

          {/* Bottom-Right Mini Circular Node */}
          <div className="mini-node node-bottom-right" title="Fresh Potatoes">
            <img src="/assets/fresh potato.jpg" alt="Potatoes" />
          </div>
        </div>

        {/* Right Side Content (Aligned Left) */}
       {/* Right Side Content */}
<div className="feature-side-content feature-side-right">

<div className="feature-text-block">
  <div className="feature-label">
    <span className="feature-dot"></span>
    <span>PERFECT FOR</span>
  </div>

  <h4>Healthy Everyday Living</h4>

  <p>
    Perfect for wholesome breakfasts, fresh juices, family meals,
    detox blends and delicious organic recipes.
  </p>
</div>

<div className="feature-text-block">
  <div className="feature-label">
    <span className="feature-dot"></span>
    <span>NATURAL BENEFITS</span>
  </div>

  <h4>Nature's Goodness</h4>

  <p>
    Naturally rich in vitamin C, antioxidants and plant-based
    nutrients to support a fresh and balanced lifestyle.
  </p>
</div>

</div>
      </div>
    </section>
  );
}
