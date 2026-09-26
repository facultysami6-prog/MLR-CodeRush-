import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function SaleCountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    mins: 45,
    secs: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        }

        if (prev.mins > 0) {
          return {
            ...prev,
            mins: prev.mins - 1,
            secs: 59
          };
        }

        if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            mins: 59,
            secs: 59
          };
        }

        if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            mins: 59,
            secs: 59
          };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-image">
      <div className="sale-grid-container">

        {/* Left Side */}
        <div >
          {/* Image yahan baad mein add kar sakte ho */}
        </div>

        {/* Right Side */}
        <div className='sectionstart'>

          {/* Badge */}
          <span className="badge bg-success fw-bold px-3 py-2 mb-3">
            NEW ORGANIC FOODS
          </span>
<br /><br />
          {/* Heading */}
          <h2 className="display-5 fw-bold text-dark lh-sm mb-4">
            Sale <span className="text-success">68% Off</span>
            <br />
            All Fruit Products
          </h2>

          {/* Description */}
          <p className="text-secondary small lh-base mb-4" style={{ maxWidth: '540px' }}>
            Get seasonal organic harvest baskets delivered directly from
            verified neighborhood farmers markets near you.
          </p>

          {/* Countdown */}
          <div className="timer-boxes-row">

            <div className="timer-box">
              <div className="timer-num">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="timer-lbl">
                days
              </div>
            </div>

            <div className="timer-box">
              <div className="timer-num">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="timer-lbl">
                hours
              </div>
            </div>

            <div className="timer-box">
              <div className="timer-num">
                {String(timeLeft.mins).padStart(2, '0')}
              </div>
              <div className="timer-lbl">
                mins
              </div>
            </div>

            <div className="timer-box">
              <div className="timer-num">
                {String(timeLeft.secs).padStart(2, '0')}
              </div>
              <div className="timer-lbl">
                secs
              </div>
            </div>

          </div>

          {/* Button */}
     

        </div>
      </div>
    </section>
  );
}

