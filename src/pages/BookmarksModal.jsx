import React from 'react';
import { Bookmark, Download, Trash2, X, ExternalLink } from 'lucide-react';

export default function BookmarksModal({ bookmarks, onClose, onRemoveBookmark }) {
  const handleExport = () => {
    if (bookmarks.length === 0) return;

    let content = "=== FreshFind Saved Bookmarks ===\n\n";
    bookmarks.forEach((item, i) => {
      content += `${i + 1}. [${item.type.toUpperCase()}] ${item.title}\n`;
      if (item.note) content += `   Personal Note: ${item.note}\n`;
      content += `   Saved on: ${new Date().toLocaleDateString()}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'freshfind_bookmarks.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bookmarks-modal-overlay" onClick={onClose}>
      <div className="bookmarks-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3><Bookmark size={20} /> Your Saved Bookmarks ({bookmarks.length})</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {bookmarks.length === 0 ? (
            <div className="empty-bookmarks">
              <p>You haven't bookmarked any markets or produce entries yet.</p>
              <small>Click the bookmark icon on any card to save it for quick reference!</small>
            </div>
          ) : (
            <div className="bookmarks-list">
              {bookmarks.map((item) => (
                <div key={item.id} className="bookmark-item-card">
                  <div className="item-info">
                    <span className="type-badge">{item.type}</span>
                    <h4>{item.title}</h4>
                    {item.note && (
                      <p className="item-note">
                        <strong>Note:</strong> "{item.note}"
                      </p>
                    )}
                  </div>

                  <button 
                    className="delete-btn" 
                    onClick={() => onRemoveBookmark(item.type, item.id)}
                    title="Remove bookmark"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {bookmarks.length > 0 && (
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleExport}>
              <Download size={16} /> Export Formatted List (.txt)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
