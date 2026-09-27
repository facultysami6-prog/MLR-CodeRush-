import React, { useMemo } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

import marketData from '../data/markets.json';
import './css/FindMarketHero.css';

export default function FindMarketHero({
  eyebrow = 'FreshFind Market Finder',
  label = 'Fresh, local, on your terms',
  title = 'Find your next',
  highlight = 'market day.',
  description = 'Explore neighbourhood markets, seasonal produce and opening times in one calm, simple view — then head out with a plan.',
  buttonText = 'Start exploring',
  scrollTarget = 'ffm-finder',
  trustTitle = 'Made for your neighbourhood',
  trustSubtitle = 'Find fresh within reach',
  images = null,
}) {
  const produceOptions = useMemo(
    () => [
      ...new Set(
        marketData.flatMap((market) => market.produceTypes || [])
      ),
    ].sort(),
    []
  );

  const handleExplore = () => {
    let target = null;
    if (scrollTarget) {
      target = document.getElementById(scrollTarget);
    }

    if (target) {
      const navOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.75,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="ffm-hero">

      <div className="ffm-hero__grain" aria-hidden="true" />

      <div
        className="ffm-hero__glow ffm-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="ffm-hero__glow ffm-hero__glow--two"
        aria-hidden="true"
      />

      <div
        className="ffm-hero__leaf ffm-hero__leaf--one"
        aria-hidden="true"
      />

      <div
        className="ffm-hero__leaf ffm-hero__leaf--two"
        aria-hidden="true"
      />

      <div className="ffm-hero__grid" aria-hidden="true" />

      <div className="ffm-container ffm-hero__inner">

      

        <div className="ffm-hero__copy">

          <span className="ffm-eyebrow">
            <Sparkles size={14} />
            {eyebrow}
          </span>

          <span className="ffm-hero__label">
            <span className="ffm-hero__label-dot" />
            {label}
          </span>

          <h1>
            {title} <em>{highlight}</em>
          </h1>

          <p>
            {description}
          </p>

          <div className="ffm-hero__actions">

            <button
              type="button"
              className="ffm-hero__cta"
              onClick={handleExplore}
            >
              <span>{buttonText}</span>
              <ArrowRight size={18} />
            </button>

            <div className="ffm-hero__trust">
              <span className="ffm-hero__trust-icon">
                <MapPin size={15} />
              </span>

              <span>
                <strong>{trustTitle}</strong>
                <small>{trustSubtitle}</small>
              </span>
            </div>

          </div>
        </div>




        <div className="ffm-hero__visual" aria-hidden="true">

          <div className="ffm-hero__visual-halo" />

          <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--one" />

          <div className="ffm-hero__visual-orbit ffm-hero__visual-orbit--two" />



          <div className="ffm-hero-photo ffm-hero-photo--main">

            <img
              src={images?.[0] || marketData[0]?.image}
              alt=""
            />

            <div className="ffm-hero-photo__caption">
              <span>01</span>
              City market
            </div>

          </div>



          <div className="ffm-hero-photo ffm-hero-photo--side">

            <img
              src={images?.[1] || marketData[1]?.image || marketData[0]?.image}
              alt=""
            />

            <div className="ffm-hero-photo__caption">
              <span>02</span>
              Community growers
            </div>

          </div>



          <div className="ffm-hero-photo ffm-hero-photo--mini">

            <img
              src={images?.[2] || marketData[2]?.image || marketData[0]?.image}
              alt=""
            />

          </div>



          <div className="ffm-hero__floating-tag ffm-hero__floating-tag--top">
            <span className="ffm-float-dot" />
            Today's fresh picks
          </div>

          <div className="ffm-hero__floating-tag ffm-hero__floating-tag--bottom">
            <MapPin size={13} />
            Local first
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



      <div
        className="ffm-hero__bottom-rule"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>

    </section>
  );
}