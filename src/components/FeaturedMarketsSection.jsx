import React, { useState } from 'react';
import { Star, MapPin, Clock, Heart, Eye } from 'lucide-react';
import './css/MarketsPage.css';

export default function FeaturedMarketsSection({
  markets,
  bookmarkedIds,
  onToggleBookmark,
  onOpenMarketModal
}) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredMarkets = markets.filter(market => {
    if (activeTab === 'Open Today') return market.isOpenToday;
    if (activeTab === 'Top Rated') return market.rating >= 4.9;
    if (activeTab === 'Weekend Markets') return market.days.includes('Saturday') || market.days.includes('Sunday');
    return true;
  });

  return (
    <section className="page-section-alt" id="markets">
      <div className="section-head-title">
        <span className="section-tagline">Local Farmers Showcase</span>
        <h2 className="section-main-heading">Market Directory</h2>
      </div>


      <div className="tabs-row-center">
        {['All', 'Open Today', 'Top Rated', 'Weekend Markets'].map(tab => (
          <button
            key={tab}
            className={`tab-pill-btn ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No markets match the selected filter criteria.</p>
        </div>
      ) : (
        <div className="market-cards-grid">
          {filteredMarkets.map(market => {
            const isBookmarked = bookmarkedIds.includes(market.id);
            return (
              <div key={market.id} className="market-item-card">
                <div className="market-card-img">
                  <img src={market.image} alt={market.name} />

                  <span className={market.isOpenToday ? 'badge-open-now' : 'badge-closed-now'}>
                    {market.isOpenToday ? 'Open Today' : 'Closed Today'}
                  </span>

                  <button
                    className={`heart-bookmark-btn ${isBookmarked ? 'active-fav' : ''}`}
                    onClick={() => onToggleBookmark(market.id)}
                    title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
                  >
                    <Heart size={18} fill={isBookmarked ? '#ef4444' : 'none'} color={isBookmarked ? '#ef4444' : 'currentColor'} />
                  </button>
                </div>

                <div className="market-card-content">
                  <span className="market-area-label">{market.area} Neighborhood</span>
                  <h3 className="market-name-title">{market.name}</h3>

                  <div className="market-detail-row">
                    <MapPin size={15} className="text-emerald-700 flex-shrink-0" />
                    <span>{market.address}</span>
                  </div>

                  <div className="market-detail-row">
                    <Clock size={15} className="text-amber-600 flex-shrink-0" />
                    <span>{market.openDaysText}</span>
                  </div>

                  <p className="market-snippet-desc">{market.description}</p>

                  <div className="produce-tags-wrap">
                    {market.produceTypes.map((type, idx) => (
                      <span key={idx} className="tag-pill">{type}</span>
                    ))}
                  </div>

                  <div className="market-card-bottom">
                    <div className="rating-box">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <span>{market.rating}</span>
                      <span className="text-xs text-slate-400 font-normal">({market.reviewsCount})</span>
                    </div>

                    <button
                      className="btn-detail-modal"
                      onClick={() => onOpenMarketModal(market)}
                    >
                      <Eye size={15} />
                      <span>View Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
