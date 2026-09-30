import React, { useState, useMemo } from "react";
import {
  Search,
  Heart,
  Sparkles,
  Sun,
  Leaf,
  Snowflake,
  Wind,
  Info,
  X,
} from "lucide-react";
import seasonalData from "../data/seasonalProduce.json";
import "./css/SeasonalRecommendation.css";

const seasons = [
  { id: "All", label: "All Seasons 🌿", icon: Leaf },
  { id: "Spring", label: "Spring 🌸", icon: Leaf },
  { id: "Summer", label: "Summer ☀️", icon: Sun },
  { id: "Autumn", label: "Fall / Autumn 🍂", icon: Wind },
  { id: "Winter", label: "Winter ❄️", icon: Snowflake },
];

const categories = ["All", "Fruit", "Vegetable", "Herb"];

const fallbackImage = "/assets/mix vegies image.jpg";

function getImage(item) {
  if (!item?.image) return fallbackImage;

  if (item.image.startsWith("/") || item.image.startsWith("http")) {
    return item.image;
  }

  return `/seasonal/${item.image}`;
}

export default function SeasonalRecommendationSection({
  onToggleBookmark,
  bookmarkedIds = [],
}) {
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemModal, setActiveItemModal] = useState(null);

  const filteredProduce = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return seasonalData.filter((item) => {
      const matchSeason =
        selectedSeason === "All" || item.season === selectedSeason;

      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchSeason && matchCategory && matchSearch;
    });
  }, [selectedSeason, selectedCategory, searchQuery]);

  const visibleProduce = filteredProduce.slice(0, 8);

  const resetFilters = () => {
    setSelectedSeason("All");
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="produce" className="seasonal-recommendation-section">
      <div className="seasonal-hero-banner">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="seasonal-hero-video"
          poster="/seasonal-hero-bg.jpg"
        >
          <source src="/seasonal-bg-video.mp4" type="video/mp4" />
          <source src="/farm-produce-video.mp4" type="video/mp4" />
        </video>

        <div className="seasonal-hero-overlay" />

        <div className="seasonal-hero-content">
          <div className="seasonal-hero-badge">
            <span>100% Farm Fresh Harvest</span>
          </div>

          <h1 className="seasonal-hero-title">Seasonal Recommendations</h1>

          <p className="seasonal-hero-subtitle">
            “Organic products directly from the farm.”
          </p>
        </div>

        <svg
          className="seasonal-wave-mask"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 Q150,90 350,30 T700,70 T1050,20 T1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="seasonal-main-content">
        <div className="seasonal-controls-box">
          <div className="category-filter-group">
            <span className="category-filter-label">Category:</span>

            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-filter-btn ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
              >
                {cat === "All" ? "All Produce" : `${cat}s`}
              </button>
            ))}
          </div>

          <div className="seasonal-search-input-wrapper">
            <Search className="seasonal-search-icon" size={18} />

            <input
              type="search"
              placeholder="Search produce, herbs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="seasonal-search-input"
            />
          </div>
        </div>

        <div className="seasonal-section-heading">
          <h2>
            {selectedSeason === "All"
              ? "All Season Fresh Harvest"
              : `${selectedSeason} Produce Selection`}
          </h2>

          <p>Showing {visibleProduce.length} featured fresh recommendations</p>
        </div>

        {visibleProduce.length > 0 ? (
          <div className="seasonal-grid">
            {visibleProduce.map((item, index) => {
              const bookmarkId = `seasonal:${item.name}`;
              const isBookmarked = bookmarkedIds.includes(bookmarkId);

              return (
                <article key={`${item.name}-${index}`} className="produce-card">
                  <img
                    src={getImage(item)}
                    alt={item.name}
                    className="produce-card-full-img"
                    onError={(e) => {
                      if (!e.currentTarget.src.endsWith(fallbackImage)) {
                        e.currentTarget.src = fallbackImage;
                      }
                    }}
                  />

                  <div className="produce-card-overlay">
                    <span className="season-badge">{item.season}</span>

                    <span className="category-badge">{item.category}</span>

                    <div className="produce-hover-content">
                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <br />
                      <br />
                      {onToggleBookmark && (
                        <button
                          type="button"
                          className={`bookmark-btn ${
                            isBookmarked ? "bookmarked" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(bookmarkId);
                          }}
                          aria-label={
                            isBookmarked
                              ? `Remove ${item.name} bookmark`
                              : `Bookmark ${item.name}`
                          }
                          aria-pressed={isBookmarked}
                        >
                          <Heart
                            size={17}
                            fill={isBookmarked ? "currentColor" : "none"}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="seasonal-empty-state">
            <div className="empty-search-icon">
              <Search size={28} />
            </div>

            <h3>No Produce Found</h3>

            <p>
              Try adjusting your search query or season filter to find what
              you're looking for.
            </p>

            <button
              type="button"
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {activeItemModal && (
        <div
          className="seasonal-modal-overlay"
          onClick={() => setActiveItemModal(null)}
        >
          <div
            className="seasonal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seasonal-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="seasonal-modal-close"
              onClick={() => setActiveItemModal(null)}
              aria-label="Close details"
            >
              <X size={19} />
            </button>

            <div className="seasonal-modal-image-box">
              <img
                src={getImage(activeItemModal)}
                alt={activeItemModal.name}
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith(fallbackImage)) {
                    e.currentTarget.src = fallbackImage;
                  }
                }}
              />

              <div className="seasonal-modal-image-overlay" />

              <div className="seasonal-modal-image-text">
                <span>{activeItemModal.season} Season</span>

                <h3 id="seasonal-modal-title">{activeItemModal.name}</h3>
              </div>
            </div>

            <div className="seasonal-modal-body">
              <div className="seasonal-modal-description">
                <h4>Description</h4>
                <p>{activeItemModal.description}</p>
              </div>

              <div className="seasonal-modal-info-grid">
                <div className="seasonal-info-box category">
                  <span>Category</span>
                  <strong>{activeItemModal.category}</strong>
                </div>

                <div className="seasonal-info-box harvest">
                  <span>Best Harvest</span>
                  <strong>Peak {activeItemModal.season}</strong>
                </div>
              </div>

              <button
                type="button"
                className="seasonal-modal-done"
                onClick={() => setActiveItemModal(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
