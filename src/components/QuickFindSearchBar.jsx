import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import './css/MarketsPage.css';

export default function QuickFindSearchBar({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  selectedDay,
  setSelectedDay,
  selectedProduce,
  setSelectedProduce,
  totalMatches,
  onResetFilters
}) {
  const areas = ['All Areas', 'Green Valley', 'Downtown', 'Eastside', 'Riverdale', 'West End', 'Highland'];
  const days = ['Any Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const produceTypes = [
    'All Produce Types',
    'Organic Vegetables',
    'Fresh Fruits',
    'Dairy & Cheese',
    'Exotic Herbs',
    'Cold-Pressed Juices',
    'Seasonal Berries',
    'Dried Fruits & Nuts'
  ];

  return (
    <div className="quick-find-wrapper" id="find-market">
      <div className="quick-find-box">
        <div className="quick-find-head">
          <h3>
            <Filter size={20} className="text-emerald-700" />
            <span>Find a Market Near You</span>
          </h3>
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-3">
            <span>Found <strong>{totalMatches}</strong> matching markets</span>
            {(searchQuery || selectedArea !== 'All Areas' || selectedDay !== 'Any Day' || selectedProduce !== 'All Produce Types') && (
              <button
                onClick={onResetFilters}
                className="text-amber-600 hover:underline flex items-center gap-1 font-bold"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="quick-find-row">
          {/* Search Input */}
          <div className="input-with-icon">
            <Search size={18} />
            <input
              type="text"
              className="form-field-pill"
              placeholder="Search market name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Area Select */}
          <div>
            <select
              className="select-pill"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              {areas.map((a, i) => (
                <option key={i} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Day Select */}
          <div>
            <select
              className="select-pill"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {days.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Produce Type Select */}
          <div>
            <select
              className="select-pill"
              value={selectedProduce}
              onChange={(e) => setSelectedProduce(e.target.value)}
            >
              {produceTypes.map((pt, i) => (
                <option key={i} value={pt}>{pt}</option>
              ))}
            </select>
          </div>

          {/* Filter Action Button */}
          <div>
            <button
              className="btn-filter-find"
              onClick={() => {
                const element = document.getElementById('markets');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
