import React, { useState } from 'react';
import { X, Heart, Trash2, Download, MapPin, Share2, FileText } from 'lucide-react';
import './css/BookmarksDrawer.css';

export default function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedMarkets,
  bookmarkedProduce,
  onRemoveMarketBookmark,
  onRemoveProduceBookmark
}) {
  const [notes, setNotes] = useState({});

  if (!isOpen) return null;

  const handleNoteChange = (id, text) => {
    setNotes(prev => ({ ...prev, [id]: text }));
  };

  const handleExport = () => {
    let content = "=== FreshFind Saved Bookmarks & Market Plan ===\n\n";

    content += "--- BOOKMARKED MARKETS ---\n";
    if (bookmarkedMarkets.length === 0) {
      content += "No markets saved.\n";
    } else {
      bookmarkedMarkets.forEach((m, idx) => {
        content += `${idx + 1}. ${m.name} (${m.area})\n`;
        content += `   Address: ${m.address}\n`;
        content += `   Schedule: ${m.openDaysText}\n`;
        if (notes[m.id]) content += `   My Note: ${notes[m.id]}\n`;
        content += "\n";
      });
    }

    content += "--- BOOKMARKED PRODUCE ---\n";
    if (bookmarkedProduce.length === 0) {
      content += "No produce items saved.\n";
    } else {
      bookmarkedProduce.forEach((p, idx) => {
        content += `${idx + 1}. ${p.name} - ${p.price}\n`;
        content += `   Category: ${p.category} (${p.season})\n`;
        if (notes[p.id]) content += `   My Note: ${notes[p.id]}\n`;
        content += "\n";
      });
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FreshFind_Bookmarks_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalCount = bookmarkedMarkets.length + bookmarkedProduce.length;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 font-extrabold text-slate-800 text-lg">
            <Heart size={22} className="text-red-500 fill-red-500" />
            <span>Saved Bookmarks ({totalCount})</span>
          </div>
          <button className="text-slate-400 hover:text-slate-700 p-1" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto py-4 space-y-6">
          {/* Markets Section */}
          <div>
            <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-3">Saved Markets ({bookmarkedMarkets.length})</h4>
            {bookmarkedMarkets.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No markets bookmarked yet.</p>
            ) : (
              <div className="space-y-3">
                {bookmarkedMarkets.map(m => (
                  <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 relative">
                    <button
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                      onClick={() => onRemoveMarketBookmark(m.id)}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="font-bold text-sm text-slate-800">{m.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-emerald-600" /> {m.address}
                    </div>

                    <textarea
                      className="w-full mt-2 p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-emerald-600"
                      placeholder="Add personal session note (e.g., Buy honey here)..."
                      rows={2}
                      value={notes[m.id] || ''}
                      onChange={(e) => handleNoteChange(m.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Produce Section */}
          <div>
            <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-3">Saved Produce ({bookmarkedProduce.length})</h4>
            {bookmarkedProduce.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No produce items bookmarked yet.</p>
            ) : (
              <div className="space-y-3">
                {bookmarkedProduce.map(p => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 relative">
                    <button
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                      onClick={() => onRemoveProduceBookmark(p.id)}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="font-bold text-sm text-slate-800">{p.name}</div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">{p.price}</div>

                    <textarea
                      className="w-full mt-2 p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-emerald-600"
                      placeholder="Add note..."
                      rows={2}
                      value={notes[p.id] || ''}
                      onChange={(e) => handleNoteChange(p.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <button
            className="btn-primary-accent w-full justify-center"
            onClick={handleExport}
            disabled={totalCount === 0}
          >
            <Download size={18} />
            <span>Export Bookmarks (.TXT)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
