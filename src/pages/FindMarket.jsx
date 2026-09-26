import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Crosshair,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import './css/FindMarket.css';

import marketData from '../data/markets.json';
import MarketDetailModal from '../components/MarketDetailModal';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PAD = (n) => String(n).padStart(2, '0');

const toDateInput = (date) => `${date.getFullYear()}-${PAD(date.getMonth() + 1)}-${PAD(date.getDate())}`;
const toTimeInput = (date) => `${PAD(date.getHours())}:${PAD(date.getMinutes())}`;

function parseClock(value) {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'AM') hour = hour === 12 ? 0 : hour;
  if (meridiem === 'PM') hour = hour === 12 ? 12 : hour + 12;

  return hour * 60 + minute;
}

function getMarketWindow(hours) {
  const [start, end] = String(hours || '').split('-').map((part) => parseClock(part));
  if (start == null || end == null) return null;
  return { start, end };
}

function isOpenAt(market, date) {
  if (!market?.day || !date) return false;
  if (market.day !== DAY_NAMES[date.getDay()]) return false;

  const window = getMarketWindow(market.hours);
  if (!window) return false;

  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= window.start && minutes <= window.end;
}

function getMinutesUntilNextOpening(market, fromDate = new Date()) {
  const window = getMarketWindow(market.hours);
  if (!window || !market?.day) return Number.POSITIVE_INFINITY;

  const targetDay = DAY_NAMES.indexOf(market.day);
  if (targetDay < 0) return Number.POSITIVE_INFINITY;

  const dayDelta = (targetDay - fromDate.getDay() + 7) % 7;
  let diff = dayDelta * 24 * 60 + window.start - (fromDate.getHours() * 60 + fromDate.getMinutes());

  if (diff < 0) diff += 7 * 24 * 60;
  return diff;
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatTime(minutes) {
  if (minutes == null || Number.isNaN(minutes)) return '';
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const meridiem = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${PAD(mins)} ${meridiem}`;
}

function formatDateLong(value) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'your chosen date';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

const cardThemes = ['sun', 'leaf', 'apricot', 'meadow'];

function MarketCard({ market, index, distance, bookmarked, onToggleBookmark, onOpen }) {
  const status = getMarketWindow(market.hours);
  const accent = cardThemes[index % cardThemes.length];
  const availabilityLine = `${market.day} ${market.hours}`;

  return (
    <article className={`ffm-market-card ffm-market-card--${accent}`}>
      <div className="ffm-market-card__top">
        <span className="ffm-card-orb ffm-card-orb--one" aria-hidden="true" />
        <span className="ffm-card-orb ffm-card-orb--two" aria-hidden="true" />
        <span className="ffm-card-speck ffm-card-speck--one" aria-hidden="true" />
        <span className="ffm-card-speck ffm-card-speck--two" aria-hidden="true" />

        <div className="ffm-card-badge">
          <Sparkles size={13} />
          Local market
        </div>

        <div className="ffm-card-photo-wrap">
          <span className="ffm-card-photo-ring" aria-hidden="true" />
          <img src={market.image} alt="" className="ffm-card-photo" loading="lazy" />
          <div className="ffm-card-rating">
            <Star size={12} fill="currentColor" />
            {market.rating?.toFixed(1) || '4.8'}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`ffm-heart ${bookmarked ? 'is-saved' : ''}`}
        aria-label={bookmarked ? `Remove ${market.name} from bookmarks` : `Save ${market.name}`}
        onClick={() => onToggleBookmark(market.id)}
      >
        <Heart size={19} fill={bookmarked ? 'currentColor' : 'none'} />
      </button>

      <div className="ffm-market-card__body">
        <p className="ffm-card-area">{market.area}</p>
        <h3>{market.name}</h3>

        <div className="ffm-card-rule" />

        <div className="ffm-card-hours">
          <div className="ffm-card-hours__main">
            <span className="ffm-card-hours__icon"><Clock3 size={16} /></span>
            <span>{availabilityLine}</span>
          </div>
          {distance != null && (
            <span className="ffm-distance"><MapPin size={11} /> {distance.toFixed(1)} km</span>
          )}
        </div>

        <p className="ffm-card-description">{market.desc}</p>

        <div className="ffm-chip-row">
          {market.produceTypes?.slice(0, 3).map((type) => (
            <span className="ffm-chip" key={type}>{type}</span>
          ))}
          {market.produceTypes?.length > 3 && (
            <span className="ffm-chip ffm-chip--muted">+{market.produceTypes.length - 3}</span>
          )}
        </div>

        <div className="ffm-card-footer">
          <span className="ffm-next-open">
            <span className="ffm-pulse" />
            {status ? `Opens ${formatTime(status.start)}` : 'Schedule listed'}
          </span>
          <button type="button" className="ffm-details-btn" onClick={() => onOpen(market)}>
            Explore market
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FindMarket() {
  const {
    bookmarkedMarketIds = [],
    handleToggleMarketBookmark = () => {},
  } = useOutletContext() || {};

  const today = new Date();
  const [keyword, setKeyword] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState(toDateInput(today));
  const [time, setTime] = useState(toTimeInput(today));
  const [useAnyDay, setUseAnyDay] = useState(true);
  const [openOnly, setOpenOnly] = useState(false);
  const [radius, setRadius] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [locationMessage, setLocationMessage] = useState('');
  const [produceFilter, setProduceFilter] = useState('');
  const [sortBy, setSortBy] = useState('smart');
  const [selectedMarket, setSelectedMarket] = useState(null);

  const selectedDate = useMemo(() => new Date(`${date}T${time || '00:00'}:00`), [date, time]);
  const selectedDateLabel = useMemo(() => formatDateLong(date), [date]);
  const selectedTimeLabel = useMemo(() => {
    if (!time) return 'your chosen time';
    const [hours, minutes] = time.split(':').map(Number);
    return formatTime(hours * 60 + minutes);
  }, [time]);

  const areas = useMemo(
    () => [...new Set(marketData.map((market) => market.area).filter(Boolean))].sort(),
    []
  );

  const produceOptions = useMemo(
    () => [...new Set(marketData.flatMap((market) => market.produceTypes || []))].sort(),
    []
  );

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationMessage('Location services are not supported by this browser.');
      return;
    }

    setLocationStatus('loading');
    setLocationMessage('Finding markets around you…');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus('ready');
        setLocationMessage('Using your current location.');
        setSortBy('smart');
      },
      () => {
        setLocationStatus('error');
        setLocationMessage('Location access was not available. You can still search by area.');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  const results = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    const filtered = marketData.filter((market) => {
      const matchesKeyword =
        !query ||
        market.name?.toLowerCase().includes(query) ||
        market.area?.toLowerCase().includes(query) ||
        market.address?.toLowerCase().includes(query) ||
        market.produceTypes?.some((type) => type.toLowerCase().includes(query));

      const matchesArea = !area || market.area === area;
      const matchesProduce = !produceFilter || market.produceTypes?.includes(produceFilter);
      const matchesDay = useAnyDay || market.day === DAY_NAMES[selectedDate.getDay()];
      const matchesOpen = !useAnyDay && openOnly ? isOpenAt(market, selectedDate) : true;

      let matchesRadius = true;
      if (userLocation && radius > 0) {
        matchesRadius = distanceKm(userLocation.lat, userLocation.lng, market.lat, market.lng) <= radius;
      }

      return matchesKeyword && matchesArea && matchesProduce && matchesDay && matchesOpen && matchesRadius;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);

      if (userLocation) {
        const distanceA = distanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distanceB = distanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng);
        if (Math.abs(distanceA - distanceB) > 0.01) return distanceA - distanceB;
      }

      return getMinutesUntilNextOpening(a, useAnyDay ? new Date() : selectedDate) -
        getMinutesUntilNextOpening(b, useAnyDay ? new Date() : selectedDate);
    });
  }, [area, keyword, openOnly, produceFilter, radius, selectedDate, sortBy, useAnyDay, userLocation]);

  const activeFilters = [
    keyword ? { key: 'keyword', label: `“${keyword}”`, clear: () => setKeyword('') } : null,
    area ? { key: 'area', label: area, clear: () => setArea('') } : null,
    produceFilter ? { key: 'produce', label: produceFilter, clear: () => setProduceFilter('') } : null,
    !useAnyDay ? { key: 'date', label: `${selectedDateLabel} · ${selectedTimeLabel}`, clear: () => setUseAnyDay(true) } : null,
    openOnly && !useAnyDay ? { key: 'open', label: 'Open at exact time', clear: () => setOpenOnly(false) } : null,
    radius > 0 && userLocation ? { key: 'radius', label: `${radius} km`, clear: () => setRadius(0) } : null,
  ].filter(Boolean);

  const clearAll = () => {
    setKeyword('');
    setArea('');
    setProduceFilter('');
    setDate(toDateInput(new Date()));
    setTime(toTimeInput(new Date()));
    setUseAnyDay(true);
    setOpenOnly(false);
    setRadius(0);
  };

  const summaryText = useAnyDay
    ? 'Browse markets across every day of the week.'
    : openOnly
      ? `Open at ${selectedTimeLabel} on ${selectedDateLabel}.`
      : `Running on ${selectedDateLabel}.`;

  return (
    <div className="ffm-page">
      <section className="ffm-hero">
        <div className="ffm-hero__grain" aria-hidden="true" />
        <div className="ffm-hero__glow ffm-hero__glow--one" aria-hidden="true" />
        <div className="ffm-hero__glow ffm-hero__glow--two" aria-hidden="true" />
        <div className="ffm-hero__leaf ffm-hero__leaf--one" aria-hidden="true" />
        <div className="ffm-hero__leaf ffm-hero__leaf--two" aria-hidden="true" />
        <div className="ffm-hero__grid" aria-hidden="true" />

        <div className="ffm-container ffm-hero__inner">
          <div className="ffm-hero__copy">
            <span className="ffm-eyebrow"><Sparkles size={14} /> FreshFind Market Finder</span>
            <span className="ffm-hero__label"><span className="ffm-hero__label-dot" /> Fresh, local, on your terms</span>
            <h1>Find your next <em>market day.</em></h1>
            <p>
              Explore neighbourhood markets, seasonal produce and opening times in one calm, simple view — then head out with a plan.
            </p>

            <div className="ffm-hero__actions">
              <button
                type="button"
                className="ffm-hero__cta"
                onClick={() => document.getElementById('ffm-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <span>Start exploring</span>
                <ArrowRight size={18} />
              </button>
              <div className="ffm-hero__trust">
                <span className="ffm-hero__trust-icon"><MapPin size={15} /></span>
                <span><strong>Made for your neighbourhood</strong><small>Find fresh within reach</small></span>
              </div>
            </div>
          </div>

          <div className="ffm-hero__visual" aria-hidden="true">
            <div className="ffm-hero__visual-halo" />
            <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--one" />
            <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--two" />

            <div className="ffm-hero-photo ffm-hero-photo--main">
              <img src={marketData[0]?.image} alt="" />
              <div className="ffm-hero-photo__caption"><span>01</span> City market</div>
            </div>
            <div className="ffm-hero-photo ffm-hero-photo--side">
              <img src={marketData[1]?.image} alt="" />
              <div className="ffm-hero-photo__caption"><span>02</span> Community growers</div>
            </div>
            <div className="ffm-hero-photo ffm-hero-photo--mini">
              <img src={marketData[2]?.image} alt="" />
            </div>

            <div className="ffm-hero__floating-tag ffm-hero__floating-tag--top">
              <span className="ffm-float-dot" /> Today&apos;s fresh picks
            </div>
            <div className="ffm-hero__floating-tag ffm-hero__floating-tag--bottom">
              <MapPin size={13} /> Local first
            </div>

            <div className="ffm-hero__meta">
              <div className="ffm-hero-stat">
                <strong>{marketData.length}</strong>
                <span>markets</span>
              </div>
              <div className="ffm-hero-divider" />
              <div className="ffm-hero-stat">
                <strong>{produceOptions.length}+</strong>
                <span>fresh picks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ffm-hero__bottom-rule" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <main id="ffm-finder" className="ffm-main">
        <div className="ffm-container">
          <div className="ffm-finder-shell">
            <aside className="ffm-filter-panel">
              <div className="ffm-panel-heading">
                <div>
                  <span className="ffm-panel-kicker">Search & filter</span>
                  <h2>Where</h2>
                </div>
                {activeFilters.length > 0 && (
                  <button type="button" className="ffm-clear-all" onClick={clearAll}>Clear all</button>
                )}
              </div>

              <div className="ffm-control ffm-control--search">
                <label htmlFor="ffm-keyword">Keyword</label>
                <div className="ffm-input-wrap">
                  <Search size={18} />
                  <input
                    id="ffm-keyword"
                    type="search"
                    placeholder="Market, street or product"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                  {keyword && (
                    <button type="button" className="ffm-input-clear" aria-label="Clear search" onClick={() => setKeyword('')}>
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="ffm-control">
                <label htmlFor="ffm-area">Neighbourhood</label>
                <div className="ffm-select-wrap">
                  <MapPin size={17} />
                  <select id="ffm-area" value={area} onChange={(event) => setArea(event.target.value)}>
                    <option value="">Anywhere in the city</option>
                    {areas.map((item) => <option value={item} key={item}>{item}</option>)}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <button type="button" className={`ffm-location-btn ${locationStatus === 'ready' ? 'is-ready' : ''}`} onClick={requestLocation} disabled={locationStatus === 'loading'}>
                <Crosshair size={18} />
                <span>{locationStatus === 'loading' ? 'Locating…' : locationStatus === 'ready' ? 'Location found' : 'Use my current location'}</span>
              </button>

              <div className="ffm-control">
                <label htmlFor="ffm-radius">Within</label>
                <div className={`ffm-select-wrap ${!userLocation ? 'is-muted' : ''}`}>
                  <Crosshair size={17} />
                  <select id="ffm-radius" value={radius} disabled={!userLocation} onChange={(event) => setRadius(Number(event.target.value))}>
                    <option value={0}>Any distance</option>
                    <option value={2}>2 km</option>
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={25}>25 km</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              {locationMessage && (
                <p className={`ffm-location-note ${locationStatus === 'error' ? 'is-error' : ''}`} role="status">{locationMessage}</p>
              )}

              <div className="ffm-panel-divider" />

              <div className="ffm-panel-heading ffm-panel-heading--when">
                <div>
                  <span className="ffm-panel-kicker">Schedule</span>
                  <h2>When</h2>
                </div>
              </div>

              <div className="ffm-segment" role="radiogroup" aria-label="Date range">
                <button type="button" role="radio" aria-checked={useAnyDay} className={useAnyDay ? 'is-active' : ''} onClick={() => { setUseAnyDay(true); setOpenOnly(false); }}>Any day</button>
                <button type="button" role="radio" aria-checked={!useAnyDay} className={!useAnyDay ? 'is-active' : ''} onClick={() => setUseAnyDay(false)}>Choose date & time</button>
              </div>

              <div className={`ffm-date-grid ${useAnyDay ? 'is-disabled' : ''}`}>
                <div className="ffm-control">
                  <label htmlFor="ffm-date">Date</label>
                  <div className="ffm-input-wrap ffm-input-wrap--plain">
                    <CalendarDays size={17} />
                    <input id="ffm-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} disabled={useAnyDay} />
                  </div>
                </div>
                <div className="ffm-control">
                  <label htmlFor="ffm-time">Time</label>
                  <div className="ffm-input-wrap ffm-input-wrap--plain">
                    <Clock3 size={17} />
                    <input id="ffm-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} disabled={useAnyDay} />
                  </div>
                </div>
              </div>

              <label className={`ffm-switch ${useAnyDay ? 'is-disabled' : ''}`}>
                <input type="checkbox" checked={openOnly} disabled={useAnyDay} onChange={(event) => setOpenOnly(event.target.checked)} />
                <span className="ffm-switch__track"><span /></span>
                <span>
                  <strong>Open at this exact time</strong>
                  <small>Only show markets currently open then.</small>
                </span>
              </label>

              <button type="button" className="ffm-now-btn" onClick={() => {
                const now = new Date();
                setDate(toDateInput(now));
                setTime(toTimeInput(now));
                setUseAnyDay(false);
                setOpenOnly(true);
              }}>
                Use current date & time
              </button>

              <div className="ffm-panel-divider" />

              <div className="ffm-control">
                <label htmlFor="ffm-produce">Looking for</label>
                <div className="ffm-select-wrap">
                  <Sparkles size={17} />
                  <select id="ffm-produce" value={produceFilter} onChange={(event) => setProduceFilter(event.target.value)}>
                    <option value="">Any produce</option>
                    {produceOptions.map((item) => <option value={item} key={item}>{item}</option>)}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="ffm-control">
                <label htmlFor="ffm-sort">Sort results</label>
                <div className="ffm-select-wrap">
                  <Star size={17} />
                  <select id="ffm-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="smart">Smart order</option>
                    <option value="rating">Highest rated</option>
                    <option value="name">A–Z</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </aside>

            <section className="ffm-results" aria-live="polite">
              <div className="ffm-results-head">
                <div>
                  <span className="ffm-panel-kicker">Your results</span>
                  <h2><strong>{results.length}</strong> {results.length === 1 ? 'market' : 'markets'}</h2>
                  <p>{summaryText}</p>
                </div>
                <div className="ffm-results-mark">
                  <span>Fresh picks</span>
                  <span className="ffm-mark-dot" />
                  <span>{userLocation ? 'Nearest first' : 'Next opening first'}</span>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="ffm-filter-chips">
                  {activeFilters.map((filter) => (
                    <button type="button" key={filter.key} onClick={filter.clear}>
                      <Check size={13} />
                      {filter.label}
                      <X size={14} />
                    </button>
                  ))}
                </div>
              )}

              {results.length > 0 ? (
                <div className="ffm-results-grid">
                  {results.map((market, index) => {
                    const distance = userLocation ? distanceKm(userLocation.lat, userLocation.lng, market.lat, market.lng) : null;
                    return (
                      <MarketCard
                        key={market.id}
                        market={market}
                        index={index}
                        distance={distance}
                        bookmarked={bookmarkedMarketIds.includes(market.id)}
                        onToggleBookmark={handleToggleMarketBookmark}
                        onOpen={setSelectedMarket}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="ffm-empty">
                  <div className="ffm-empty__icon"><Search size={24} /></div>
                  <h3>No markets match that combination.</h3>
                  <p>Try a wider neighbourhood, turn off exact-time matching, or remove one of the active filters.</p>
                  <button type="button" className="ffm-details-btn ffm-details-btn--solid" onClick={clearAll}>Reset filters <ArrowRight size={16} /></button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <MarketDetailModal
        market={selectedMarket}
        onClose={() => setSelectedMarket(null)}
        isBookmarked={selectedMarket ? bookmarkedMarketIds.includes(selectedMarket.id) : false}
        onToggleBookmark={handleToggleMarketBookmark}
      />
    </div>
  );
}
