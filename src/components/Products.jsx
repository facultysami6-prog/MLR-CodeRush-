import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productData from "../data/products.json";
import "./product.css";

const Products = () => {
  const cardRefs = useRef([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const colors = ["orange", "cyan", "pink", "orange"];

  const categories = [
    "All",
    ...new Set(productData.products.map((product) => product.category)),
  ];
  const requestedCategory = searchParams.get("category");
  const selectedCategory =
    categories.find(
      (category) => category.toLowerCase() === requestedCategory?.toLowerCase(),
    ) || "All";

  const selectCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const filteredProducts = productData.products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.season,
      product.price,
      ...(product.markets || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = search === "" || searchableText.includes(search);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [selectedCategory, searchTerm]);

  return (
    <section className="products-section">
      <div className="products-wrapper">
        <div className="products-header">
          <h2>Fresh Products Catalogue</h2>

          <p>
            Browse our products and discover their description, typical season,
            and available markets.
          </p>
        </div>

      

        <div className="search-filter-row">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => selectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products, description, season, markets..."
              aria-label="Search products"
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {searchTerm && (
          <div className="search-result-count">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </div>
        )}

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`product-card ${colors[index % colors.length]}`}
            >
              <div className="first-content">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="front-overlay"></div>

                <div className="front-content">
                  <div className="front-top">
                    <span className="product-category-label">
                      {product.category}
                    </span>

                    <span className="product-price">
                      {product.price || "$80"}
                    </span>
                  </div>

                  <div className="front-bottom">
                    <span className="season-label">{product.season}</span>

                    <h3>{product.name}</h3>

                    <span className="hover-text">Hover to explore</span>
                  </div>
                </div>
              </div>

              <div className="second-content">
                <div className="back-content">
                  <div className="back-header">
                    <span className="back-category">{product.category}</span>

                    <span className="back-season">{product.season}</span>
                  </div>

                  <h3>{product.name}</h3>

                  <p className="product-description">{product.description}</p>

                  <div className="back-details">
                    <div className="detail-item">
                      <span className="detail-label">Typical Season</span>

                      <span className="detail-value">{product.season}</span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Available Markets</span>

                      <div className="market-list">
                        {product.markets?.map((market, marketIndex) => (
                          <span key={marketIndex} className="market-tag">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="back-bottom">
                    <div className="product-dots">
                      {product.markets?.map((market, marketIndex) => (
                        <span
                          key={marketIndex}
                          className={`dot ${marketIndex === 0 ? "active" : ""}`}
                          title={market}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>

            <p>
              Try searching with another product name, description, season,
              market, or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
