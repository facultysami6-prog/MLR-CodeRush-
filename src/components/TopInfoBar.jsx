import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Phone, Mail, Sparkles } from 'lucide-react';

export default function TopInfoBar({ onOpenBookmarks, bookmarkCount }) {
  const [timeString, setTimeString] = useState('');
  const [visitorCount, setVisitorCount] = useState(5867);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Simulate visitor counter slight increment for live feel
    const vTimer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 2));
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(vTimer);
    };
  }, []);

  return (
    <div className="top-info-bar">
      <div className="top-info-left">
        <div className="info-badge">
          <Clock size={14} className="text-emerald-300" />
          <span>{timeString || 'Loading time...'}</span>
        </div>
        <div className="info-badge">
          <span className="badge-pulse"></span>
          <span>4 Local Markets Open Right Now</span>
        </div>
        <div className="info-badge hidden-mobile">
          <Users size={14} />
          <span>Visitors: <strong>{visitorCount.toLocaleString()}</strong></span>
        </div>
      </div>

      <div className="top-info-right">
        <div className="info-badge hidden-mobile">
          <Sparkles size={14} />
          <span>Theme: eGreen Basket</span>
        </div>
        <div className="info-badge">
          <Phone size={14} />
          <span>+1 (555) 019-2834</span>
        </div>
      </div>
    </div>
  );
}
