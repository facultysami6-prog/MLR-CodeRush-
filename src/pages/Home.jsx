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
    <div className="home-page-shell min-h-screen flex flex-col bg-white">

      <HeroRealSection
        onExploreClick={() => {
          const el = document.getElementById('trending');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    
      <div id="trending">
        <BestTrendingCards />
      </div>

    
      <PopularCategoriesCircular
        onSelectCategory={(catType) => setSelectedCategory(catType)}
      />

    
      <CircularProductFeature />


      <SeasonalRecommendationSection
        bookmarkedIds={bookmarkedProduceIds}
        onToggleBookmark={handleToggleProduceBookmark}
      />

   
      <SaleCountdownSection />

  
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
