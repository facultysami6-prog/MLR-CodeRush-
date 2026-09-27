import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowRight, ArrowUp, Quote, Leaf as LeafIcon } from "lucide-react";
import { Reveal } from "./Motion";
import "../styles/TrustedSection.css";

const FEATURES = [
  "Certified organic growers",
  "Farmer-direct, fair pricing",
  "Verified market listings",
  "Same-day local delivery",
];

const TESTIMONIALS = [
  {
    quote:
      "Every crate arrives the same day it's picked. I can finally taste the difference organic makes for my family.",
    name: "Amara Whitfield",
    role: "FreshFind member, Northfield",
  },
  {
    quote:
      "Listing our farm on FreshFind connected us straight to neighbours who care where their food comes from.",
    name: "Devon Okafor",
    role: "Grower, Riverside Market",
  },
  {
    quote:
      "A trustworthy, transparent way to shop local. Our whole community association recommends it now.",
    name: "Priya Nakamura",
    role: "Market organiser",
  },
];


function Almond({ className, gradId }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 56"
      width="30"
      height="42"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7b978" />
          <stop offset="1" stopColor="#c97a2b" />
        </linearGradient>
      </defs>
      <path
        d="M20 2c9 8 17 20 17 32a17 17 0 1 1-34 0C3 22 11 10 20 2Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M20 8c6 7 12 16 12 25"
        stroke="#8a4a12"
        strokeOpacity=".35"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function TrustedSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const timerRef = useRef(null);

  const goTo = (i) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrev((p) => p);
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % TESTIMONIALS.length;
      });
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % TESTIMONIALS.length;
      });
    }, 5500);
  };

  return (
    <section className="trusted-section" aria-labelledby="trusted-heading">
    
      <div className="trusted-ambient" aria-hidden="true">
        <span className="ambient-blob ambient-blob--a" />
        <span className="ambient-blob ambient-blob--b" />
        <span className="ambient-dots" />
      </div>

      <div className="container trusted-container">
        
        <Reveal as="div" className="trusted-content" variant="left">
          <div className="trusted-kicker">
           
          </div>

          <h2 id="trusted-heading" className="trusted-heading">
            Trusted <span>Organic</span>
            <br />
            Sourced With Care
          </h2>

          <p className="trusted-description">
            Every listing on FreshFind is verified at the source, so the
            produce on your table can be traced back to a grower you can
            actually meet at the market.
          </p>
          <p className="trusted-description">
            No middlemen, no guesswork &mdash; just honest harvests, fair
            prices, and a community that looks out for its local farms.
          </p>

          <Reveal as="ul" className="features" stagger delay={150}>
            {FEATURES.map((f, i) => (
              <li className="feature rs-item" style={{ "--i": i }} key={f}>
                <span className="feature-icon">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </span>
                <strong>{f}</strong>
              </li>
            ))}
          </Reveal>

          <button className="btn btn-primary trusted-cta" type="button">
            Subscribe
            <ArrowRight size={18} />
          </button>
        </Reveal>

  
        <Reveal as="div" className="trusted-visual" variant="right" delay={120}>
          <div className="trusted-media">
            <img
              src="https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1000&q=80"
              alt="A local organic grower smiling while carrying a crate of freshly harvested vegetables"
              loading="lazy"
            />
            <span className="media-badge">
              <LeafIcon size={14} strokeWidth={2.4} />
              Certified Organic
            </span>

            <div className="nut-cluster" aria-hidden="true">
              <Almond className="nut nut-1" gradId="nutGradA" />
              <Almond className="nut nut-2" gradId="nutGradB" />
              <Almond className="nut nut-3" gradId="nutGradC" />
            </div>
          </div>

    
          <div
            className="testimonial-card"
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            <Quote className="quote-mark" size={26} strokeWidth={2} />

            <div className="testimonial-stage">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.name}
                  className={
                    "testimonial-slide" +
                    (i === active ? " is-on" : i === prev ? " is-out" : "")
                  }
                >
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span> &mdash; {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="testimonial-dots" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${t.name}`}
                  className={i === active ? "active" : ""}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <button
        className={"back-top" + (showTop ? " is-visible" : "")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        type="button"
      >
        <ArrowUp size={18} strokeWidth={2.4} />
      </button>
    </section>
  );
}
