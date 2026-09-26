
import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Filter,
  ArrowUpDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './css/MarketDirectory.css';

import marketData from '../data/markets.json';
import FarmerCatalogSlider from './FarmerCatalogSlider';
import MarketDetailModal from '../components/MarketDetailModal';

const DAY_INDEX = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6
};

function daysUntilNextOccurrence(dayName) {
  const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  const target = DAY_INDEX[dayName];
  if (target === undefined) return 99; // unknown day, push to end
  let diff = target - today;
  if (diff < 0) diff += 7;
  return diff; // 0 = today, 1 = tomorrow, etc.
}

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
export default function MarketDirectory({
  markets,
  selectedCategoryFilter = '',
  setSelectedCategoryFilter = () => {},
  bookmarks = [],
  onToggleBookmark,
  onSelectMarket
}) {
  const outletContext = useOutletContext() || {};
  const {
    bookmarkedMarketIds = [],
    handleToggleMarketBookmark = () => {},
  } = outletContext;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [selectedMarketModal, setSelectedMarketModal] = useState(null);

  const marketList = Array.isArray(markets) && markets.length > 0 ? markets : marketData;

  const daysList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const areasList = useMemo(() => {
    if (!markets) return [];
    const uniqueAreas = [...new Set(markets.map((m) => m.area))];
    return uniqueAreas.sort();
  }, [markets]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationError('');
        setSortBy('proximity');
      },
      () => {
        setLocationError('Unable to get your location. Please allow location access.');
      }
    );
  };

  const filteredAndSortedMarkets = useMemo(() => {
    return marketList
      .filter((market) => {
        const query = searchQuery.toLowerCase().trim();

        const matchesQuery =
          !query ||
          market.name?.toLowerCase().includes(query) ||
          market.area?.toLowerCase().includes(query) ||
          market.address?.toLowerCase().includes(query);

        const matchesDay =
          !selectedDay ||
          market.day?.toLowerCase() === selectedDay.toLowerCase();

          const matchesArea = !selectedArea || market.area === selectedArea;

        const matchesCategory =
          !selectedCategoryFilter ||
          market.produceTypes?.some((p) =>
            p.toLowerCase().includes(selectedCategoryFilter.toLowerCase())
          );

          return matchesQuery && matchesDay && matchesArea && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'nextOpen') return daysUntilNextOccurrence(a.day) - daysUntilNextOccurrence(b.day);
        if (sortBy === 'proximity' && userLocation) {
          const distA = getDistanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng);
          const distB = getDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng);
          return distA - distB;
        }
        return a.name.localeCompare(b.name);
      });

  }, [
    marketList,
    searchQuery,
    selectedDay,
    selectedArea,
    selectedCategoryFilter,
    sortBy,
    userLocation
  ]);

  return (
  
    <div className="market-directory-page-shell bg-white">
      {/* MARKET DIRECTORY HERO */}
<section className="ffm-hero md-market-hero">
  <div className="ffm-hero__grain" aria-hidden="true" />
  <div className="ffm-hero__glow ffm-hero__glow--one" aria-hidden="true" />
  <div className="ffm-hero__glow ffm-hero__glow--two" aria-hidden="true" />
  <div className="ffm-hero__leaf ffm-hero__leaf--one" aria-hidden="true" />
  <div className="ffm-hero__leaf ffm-hero__leaf--two" aria-hidden="true" />
  <div className="ffm-hero__grid" aria-hidden="true" />

  <div className="ffm-container ffm-hero__inner">

    {/* LEFT CONTENT */}
    <div className="ffm-hero__copy">

      <span className="ffm-eyebrow">
        <Sparkles size={14} />
        FreshFind Market Directory
      </span>

      <span className="ffm-hero__label">
        <span className="ffm-hero__label-dot" />
        Verified local farmers markets
      </span>

      <h1>
        Discover your local <em>market.</em>
      </h1>

      <p>
        Find verified farmers markets, discover fresh seasonal produce,
        check weekly schedules and explore local growers near you.
      </p>

      <div className="ffm-hero__actions">

        <button
          type="button"
          className="ffm-hero__cta"
          onClick={() =>
            document
              .getElementById('market-directory')
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
          }
        >
          <span>Explore markets</span>
          <ArrowRight size={18} />
        </button>

        <div className="ffm-hero__trust">
          <span className="ffm-hero__trust-icon">
            <MapPin size={15} />
          </span>

          <span>
            <strong>Fresh markets near you</strong>
            <small>Search by area, day or produce</small>
          </span>
        </div>

      </div>
    </div>


    {/* RIGHT VISUAL */}
    <div className="ffm-hero__visual" aria-hidden="true">

      <div className="ffm-hero__visual-halo" />
      <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--one" />
      <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--two" />

      {/* Main image */}
      <div className="ffm-hero-photo ffm-hero-photo--main">
        <img
          src={marketList[0]?.image}
          alt=""
        />

        <div className="ffm-hero-photo__caption">
          <span>01</span>
          Local farmers
        </div>
      </div>

      {/* Side image */}
      <div className="ffm-hero-photo ffm-hero-photo--side">
        <img
          src={marketList[1]?.image || marketList[0]?.image}
          alt=""
        />

        <div className="ffm-hero-photo__caption">
          <span>02</span>
          Fresh produce
        </div>
      </div>

      {/* Small image */}
      <div className="ffm-hero-photo ffm-hero-photo--mini">
        <img
          src={marketList[2]?.image || marketList[0]?.image}
          alt=""
        />
      </div>

      {/* Floating tags */}
      <div className="ffm-hero__floating-tag ffm-hero__floating-tag--top">
        <span className="ffm-float-dot" />
        Fresh picks nearby
      </div>

      <div className="ffm-hero__floating-tag ffm-hero__floating-tag--bottom">
        <MapPin size={13} />
        Local first
      </div>

      {/* Stats */}
      <div className="ffm-hero__meta">

        <div className="ffm-hero-stat">
          <strong>{marketList.length}</strong>
          <span>markets</span>
        </div>

        <div className="ffm-hero-divider" />

        <div className="ffm-hero-stat">
          <strong>
            {[
              ...new Set(
                marketList.flatMap(
                  (market) => market.produceTypes || []
                )
              )
            ].length}
            +
          </strong>

          <span>fresh picks</span>
        </div>

      </div>

    </div>
  </div>

  <div
    className="ffm-hero__bottom-rule"
    aria-hidden="true"
  >
    <span />
    <span />
    <span />
  </div>
</section>
      {/* 1. Farmer Catalog Slider Section (Powered by catalog.json) */}
      <FarmerCatalogSlider
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
      />

      {/* 2. Verified Farmers Markets Directory Section (Powered by markets.json) */}
      <section className="market-directory-section" id="market-directory">

        <div className="section-header">
          <div className="md-sub-label">
            <span className="dots">°°°</span>
            <span>VERIFIED FARMERS MARKETS</span>
            <span className="dots">°°°</span>
          </div>

          <h2 className="section-title">
            Market Directory
          </h2>

          <p className="section-subtitle">
            Find verified operating farmers markets, view weekly schedules, and explore local organic harvests.
          </p>
        </div>

        <div className="directory-controls-card">

          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />

            <input
              type="text"
              placeholder="Search by market name, neighborhood, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button
                className="clear-btn"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="filters-row">

            <div className="filter-group">
              <label>
                <Calendar size={14} />
                Operating Day:
              </label>

              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="">All Days</option>

                {daysList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label><MapPin size={14} /> Area / Neighborhood:</label>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                <option value="">All Areas</option>
                {areasList.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>
                <Filter size={14} />
                Produce Category:
              </label>

              <select
                value={selectedCategoryFilter}
                onChange={(e) =>
                  setSelectedCategoryFilter(e.target.value)
                }
              >
                <option value="">All Categories</option>
                <option value="Package Foods">Package Foods</option>
                <option value="Awesome Broccoli">Awesome Broccoli</option>
                <option value="Fruits & Vegetables">
                  Fruits & Vegetables
                </option>
                <option value="Honey & Dairy">Honey & Dairy</option>
                <option value="Vegetables">Vegetables</option>
              </select>
            </div>

            <div className="filter-group">
              <label><ArrowUpDown size={14} /> Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'proximity' && !userLocation) {
                    requestLocation();
                  } else {
                    setSortBy(value);
                  }
                }}
              >
                <option value="name">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
                <option value="nextOpen">Opening Soonest</option>
                <option value="proximity">Nearest to Me</option>
              </select>
            </div>
          </div>

          {locationError && (
            <p style={{ color: '#c0392b', fontSize: '13px', marginTop: '6px' }}>
              {locationError}
            </p>
          )}

          {/* Active Filter Chips */}

          {(selectedCategoryFilter || selectedDay || selectedArea || searchQuery) && (
            <div className="active-filters-row">

              <span className="label">
                Active Filters:
              </span>

              {searchQuery && (
                <span className="filter-chip">
                  Search: "{searchQuery}"

                  <button
                    onClick={() => setSearchQuery('')}
                  >
                    &times;
                  </button>
                </span>
              )}

              {selectedDay && (
                <span className="filter-chip">
                  Day: {selectedDay}

                  <button
                    onClick={() => setSelectedDay('')}
                  >
                    &times;
                  </button>
                </span>
              )}

              {selectedArea && (
                <span className="filter-chip">
                  Area: {selectedArea} <button onClick={() => setSelectedArea('')}>&times;</button>
                </span>
              )}

              {selectedCategoryFilter && (
                <span className="filter-chip">
                  Category: {selectedCategoryFilter}

                  <button
                    onClick={() =>
                      setSelectedCategoryFilter('')
                    }
                  >
                    &times;
                  </button>
                </span>
              )}

              <button
                className="reset-all-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDay('');
                  setSelectedArea('');
                  setSelectedCategoryFilter('');
                }}
              >
                Reset All
              </button>

            </div>
            
          )}

        </div>

        {filteredAndSortedMarkets.length === 0 ? (

          <div className="no-results-card">

            <p>
              No farmers markets found matching your filter criteria.
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedDay('');
                setSelectedArea('');
                setSelectedCategoryFilter('');
              }}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="mkt-cards-grid">

  {filteredAndSortedMarkets.map((m, index) => {
    const isBookmarked = (bookmarks && bookmarks.length > 0)
      ? bookmarks.some((b) =>
          typeof b === 'object' ? b.id === m.id : b === m.id
        )
      : bookmarkedMarketIds.includes(m.id);

    const isNew = index < 2;

    const handleOpenMarket = () => {
      if (onSelectMarket) onSelectMarket(m);
      setSelectedMarketModal(m);
    };

    const handleToggle = (e) => {
      e.stopPropagation();

      if (onToggleBookmark) {
        onToggleBookmark('market', m.id, m.name);
      }

      handleToggleMarketBookmark(m.id);
    };

    return (
      <div
        key={m.id}
        className="mkt-card cursor-pointer"
        onClick={handleOpenMarket}
      >

        {/* FULL CARD IMAGE */}
        <div className="mkt-card-img-area">

          <img
            src={m.image}
            alt={m.name}
            className="mkt-card-img"
          />

          {/* Dark normal / green hover overlay */}
          <div className="mkt-img-overlay" />

          {/* NEW */}
          {isNew && (
            <span className="mkt-new-badge">
              NEW
            </span>
          )}

          {/* BOOKMARK */}
          <button
            className={`mkt-heart-btn ${
              isBookmarked ? 'hearted' : ''
            }`}
            onClick={handleToggle}
            title={
              isBookmarked
                ? 'Remove Bookmark'
                : 'Bookmark'
            }
          >
            <Heart
              size={15}
              fill={isBookmarked ? '#fff' : 'none'}
              color="#fff"
            />
          </button>

          {/* Normal state title */}
          <div className="mkt-card-image-title">
            <h3>{m.name}</h3>
          </div>

          {/* Hover information */}
          <div className="mkt-card-hover-content">

            <p className="mkt-card-hover-area">
              <MapPin size={13} />
              {m.area}
            </p>

            <h3 className="mkt-card-hover-title">
              {m.name}
            </h3>

            <div className="mkt-card-hover-rating">
              <Star
                size={14}
                fill="currentColor"
              />
              <span>{m.rating || '4.8'}</span>
            </div>

            <div className="mkt-card-hover-divider" />

            <p className="mkt-card-hover-desc">
              {m.desc}
            </p>

            <div className="mkt-card-hover-info">

              <span>
                <Calendar size={13} />
                {m.day || 'Weekly'}
              </span>

              <span>
                <Clock size={13} />
                {m.hours || 'Check schedule'}
              </span>

            </div>

            <button
              className="mkt-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenMarket();
              }}
            >
              View Market
              <ArrowRight size={14} />
            </button>

          </div>

        </div>

      </div>
    );
  })}

</div>
        )}

      </section>

      {/* Market Detail Popup Modal */}
      <MarketDetailModal
        market={selectedMarketModal}
        onClose={() => setSelectedMarketModal(null)}
        isBookmarked={
          selectedMarketModal
            ? bookmarkedMarketIds.includes(selectedMarketModal.id)
            : false
        }
        onToggleBookmark={(id) => handleToggleMarketBookmark(id)}
      />
    </div>
  );
}

