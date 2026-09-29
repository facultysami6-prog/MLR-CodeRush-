import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import HeroRealSection from '../components/HeroRealSection';
import BestTrendingCards from '../components/BestTrendingCards';
import PopularCategoriesCircular from '../components/PopularCategoriesCircular';
import CircularProductFeature from '../components/CircularProductFeature';
import SeasonalRecommendationSection from '../components/SeasonalRecommendation';
import SaleCountdownSection from '../components/SaleCountdownSection';
import MarketDetailModal from '../components/MarketDetailModal';

export default function Home() {
  const {
    bookmarkedMarketIds = [],
    bookmarkedProduceIds = [],
    handleToggleMarketBookmark = () => {},
    handleToggleProduceBookmark = () => {},
  } = useOutletContext() || {};

  const [selectedCategory, setSelectedCategory] = useState('All Produce');
  const [selectedMarketModal, setSelectedMarketModal] = useState(null);

  return (
    <div className="home-page-shell">

      <section className="home-reveal home-hero">
        <HeroRealSection
          onExploreClick={() => {
            const el = document.getElementById('trending');

            if (el) {
              el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
        />
      </section>

      <section id="trending" className="home-reveal home-section-delay-1">
        <BestTrendingCards />
      </section>

      <section className="home-reveal home-section-delay-2">
        <PopularCategoriesCircular
          onSelectCategory={(catType) => setSelectedCategory(catType)}
        />
      </section>

      <section className="home-reveal home-section-delay-3">
        <CircularProductFeature />
      </section>

      <section className="home-reveal home-section-delay-4">
        <SeasonalRecommendationSection
          bookmarkedIds={bookmarkedProduceIds}
          onToggleBookmark={handleToggleProduceBookmark}
        />
      </section>

      <section className="home-reveal home-section-delay-5">
        <SaleCountdownSection />
      </section>

      <MarketDetailModal
        market={selectedMarketModal}
        onClose={() => setSelectedMarketModal(null)}
        isBookmarked={
          selectedMarketModal
            ? bookmarkedMarketIds.includes(selectedMarketModal.id)
            : false
        }
        onToggleBookmark={handleToggleMarketBookmark}
      />

    </div>
  );
}