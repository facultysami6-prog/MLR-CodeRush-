import React, { useState } from 'react';
import { MapPin, Clock, Calendar, CheckCircle2, Bookmark, Navigation, X } from 'lucide-react';

export default function MarketDetailModal({ market, onClose, onToggleBookmark, isBookmarked }) {
  const [personalNote, setPersonalNote] = useState('');

  if (!market) return null;

  const handleSaveNoteBookmark = () => {
    onToggleBookmark('market', market.id, market.name, personalNote);
  };

  return (
    <div className="market-modal-overlay" onClick={onClose}>
      <div className="market-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header-hero">
          <img src={market.image} alt={market.name} />
          <div className="modal-title-overlay">
            <h2>{market.name}</h2>
            <p><MapPin size={18} /> {market.address}</p>
          </div>
        </div>

        <div className="modal-body-content">
          <div className="modal-col-left">
            <div className="info-block">
              <h3><Calendar size={18} /> Weekly Operating Schedule</h3>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Operating Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="active-day">
                    <td><strong>{market.day}</strong></td>
                    <td>{market.hours}</td>
                    <td><span className="badge open">Operating</span></td>
                  </tr>
                  <tr>
                    <td>Monday - Thursday</td>
                    <td>Closed</td>
                    <td><span className="badge closed">Closed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="info-block">
              <h3><CheckCircle2 size={18} /> Produce Available</h3>
              <div className="produce-grid">
                {market.produceTypes.map((pt, idx) => (
                  <div key={idx} className="produce-item-card">
                    <span className="icon">🌱</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-block">
              <h3><Bookmark size={18} /> Session Bookmark & Note</h3>
              <div className="note-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Add a personal reminder note (e.g. Best organic honey booth #4)..."
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                />
                <button 
                  className={`btn ${isBookmarked ? 'btn-danger' : 'btn-primary'}`}
                  onClick={handleSaveNoteBookmark}
                >
                  {isBookmarked ? 'Remove Bookmark' : 'Save Bookmark with Note'}
                </button>
              </div>
            </div>
          </div>

          <div className="modal-col-right">
            <div className="map-card">
              <h3><Navigation size={18} /> Location Map</h3>
              <div className="map-iframe-container">
                <iframe
                  title={`Map location of ${market.name}`}
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: '8px' }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(market.mapQuery || market.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
              <p className="map-footer-text">
                <strong>Address:</strong> {market.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
