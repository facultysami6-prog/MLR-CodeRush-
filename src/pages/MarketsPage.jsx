import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import QuickFindSearchBar from '../components/QuickFindSearchBar';
import FeaturedMarketsSection from '../components/FeaturedMarketsSection';
import ProduceGuideSection from '../components/ProduceGuideSection';
import MarketDetailModal from '../components/MarketDetailModal';
import marketsData from '../data/markets.json';
import produceData from '../data/produce.json';

export default function MarketsPage() {
  const {
    bookmarkedMarketIds = [],
    bookmarkedProduceIds = [],
    handleToggleMarketBookmark = () => {},
    handleToggleProduceBookmark = () => {},
  } = useOutletContext() || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedDay, setSelectedDay] = useState('Any Day');
  const [selectedProduce, setSelectedProduce] = useState('All Produce Types');
  const [selectedCategory, setSelectedCategory] = useState('All Produce');
  const [selectedMarketModal, setSelectedMarketModal] = useState(null);

  const filteredMarkets = marketsData.filter((market) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      market.name.toLowerCase().includes(q) ||
      market.address.toLowerCase().includes(q) ||
      market.area.toLowerCase().includes(q);

    const matchesArea =
      selectedArea === 'All Areas' || market.area === selectedArea;

    const matchesDay =
      selectedDay === 'Any Day' || market.days.includes(selectedDay);

    const matchesProduce =
      selectedProduce === 'All Produce Types' ||
      market.produceTypes.includes(selectedProduce);

    return matchesSearch && matchesArea && matchesDay && matchesProduce;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArea('All Areas');
    setSelectedDay('Any Day');
    setSelectedProduce('All Produce Types');
  };

  return (
    <div className="markets-page-shell min-h-screen flex flex-col bg-white">
      {/* Universal Hero from freshfind-main with 2-3 lines description */}
      <HeroRealSection
        badge="📍 COMMUNITY FARMERS MARKETS"
        title={
          <>
            Discover Verified Local <span>Farmers Markets</span>
          </>
        }
        description={`Locate community farmers markets across your region with verified operating hours, directions, and vendor listings.
Filter by neighborhood, days of the week, or specialty organic harvests to support local growers and eat fresh food every day.`}
        buttonText="Find Markets"
        scrollToId="find-market"
        sectionId="markets-hero"
      />

      {/* Quick Search and Filter Bar */}
      <QuickFindSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedProduce={selectedProduce}
        setSelectedProduce={setSelectedProduce}
        totalMatches={filteredMarkets.length}
        onResetFilters={handleResetFilters}
      />

      {/* Featured Markets Directory Cards Grid */}
      <FeaturedMarketsSection
        markets={filteredMarkets}
        bookmarkedIds={bookmarkedMarketIds}
        onToggleBookmark={handleToggleMarketBookmark}
        onOpenMarketModal={(market) => setSelectedMarketModal(market)}
      />

      {/* Seasonal Produce Guide Section */}
      <ProduceGuideSection
        produceItems={produceData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        bookmarkedProduceIds={bookmarkedProduceIds}
        onToggleProduceBookmark={handleToggleProduceBookmark}
      />

      {/* Market Detail Popup Modal */}
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
