                                                                    import React from 'react';
import { Heart } from 'lucide-react';
import './css/MarketsPage.css';

export default function ProduceGuideSection({
  produceItems,
  selectedCategory,
  setSelectedCategory,                                                                                                                 
  bookmarkedProduceIds,
  onToggleProduceBookmark
}) {
  const categories = ['All Produce', 'Fresh Fruits', 'Organic Vegetables', 'Fresh Juices', 'Exotic Herbs', 'Dairy & Cheese', 'Dried Fruits & Nuts'];

  const filteredItems = produceItems.filter(item => {
    if (selectedCategory === 'All Produce') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="page-section bg-white" id="produce">
      <div className="section-head-title">
        <span className="section-tagline">Farm Fresh Produce Guide</span>
        <h2 className="section-main-heading">Seasonal Recommendations & Organic Items</h2>
      </div>

      <div className="tabs-row-center">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-pill-btn ${selectedCategory === cat ? 'active-tab' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="produce-cards-grid">
        {filteredItems.map(item => {
          const isBookmarked = bookmarkedProduceIds.includes(item.id);
          return (
            <div key={item.id} className="produce-item-card">
              <div className="produce-img-wrap">
                <img src={item.image} alt={item.name} />
                <button
                  className={`heart-bookmark-btn ${isBookmarked ? 'active-fav' : ''}`}
                  onClick={() => onToggleProduceBookmark(item.id)}
                  title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
                >
                  <Heart size={16} fill={isBookmarked ? '#ef4444' : 'none'} color={isBookmarked ? '#ef4444' : 'currentColor'} />
                </button>
              </div>

              <div className="produce-card-body">
                <span className="produce-badge-tag">{item.badge} • {item.season}</span>
                <h3 className="produce-item-title">{item.name}</h3>
                <div className="produce-price-tag">{item.price}</div>
                <p className="produce-item-desc">{item.description}</p>
                <div className="text-xs text-emerald-800 font-bold mt-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  🌱 <strong>Nutrition:</strong> {item.nutrition}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
