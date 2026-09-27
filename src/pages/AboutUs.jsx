import React, { useState, useEffect, useRef } from 'react';
import '././css/AboutUs.css';
import './css/OrganicFarmSection.css';

import { Reveal, Counter, useParallax } from '../components/Motion';
import OrganicFarmSection from "../components/OrganicFarmSection";
// Team Photos
import ayeshaImg from '../assets/images/Guide/Ayesha.jfif';
import aasiaImg from '../assets/images/Guide/Aasia.jfif';
import atqaImg from '../assets/images/Guide/Atqa.jfif'; // Anqa's photo
import asmaImg from '../assets/images/Guide/Asma.jfif';
import kinzaImg from '../assets/images/Guide/Kinza.jfif';
import huzaifaImg from '../assets/images/Guide/Huzaifa.jfif';

// Hero & Food Showcase Images
import pepperImg from '../assets/images/Guide/pepper.jpeg';

import farming1 from '../assets/images/Guide/Farming-1.jfif';
import farming2 from '../assets/images/Guide/Farming-2.jfif';
import farming3 from '../assets/images/Guide/Farming-3.jfif';
import farming4 from '../assets/images/Guide/Farming-4.jfif';
import farming6 from '../assets/images/Guide/Farming-6.jfif';
import farming7 from '../assets/images/Guide/Farming-7.jfif';
import farming8 from '../assets/images/Guide/Farming-8.jfif';

// 4 Farm Images for 2x2 Grid (Matching Screenshot 1)
import gardeningImg from '../assets/images/Guide/Gardening is my habit.jfif';
import growVegImg from '../assets/images/Guide/Grow Your Own Fruits and Vegetables at Home.jfif';
import rusticBasketImg from '../assets/images/Guide/Rustic Garden Basket Overflowing with Fresh Organic Greens & Vegetables_.jfif';
import waterCropImg from '../assets/images/Guide/Formas para cuidar con agua cultivos.jfif';
import Icon from '../components/Icons';

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
import FindMarketHero from '../components/FindMarketHero';


const RING_R = 60;
const RING_C = 2 * Math.PI * RING_R;


const AboutUs = () => {
const statsRef = useRef(null);
  useParallax(statsRef, 0.1, 70);
  // Real-Time Clock State
  const [clockDisplay, setClockDisplay] = useState(new Date().toLocaleTimeString());

  // Dynamic Visitor Counter State
  const [visitorCount, setVisitorCount] = useState(3065);

  // Active Tab State for 3-Tab Section
  const [activeTab, setActiveTab] = useState('natural');



  // Clock Update Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setClockDisplay(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

useEffect(() => {
    const visitorTimer = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(visitorTimer);
  }, []);

  const STATS = [
  { label: 'Live Platform Timer', to:clockDisplay, suffix: '+', icon: 'clock', fill: 1 },
  { label: 'Markets Open Status', to: 1200, suffix: '+', icon: 'store', fill: 1 },
  { label: 'Live Visitors', to:visitorCount, suffix: '', icon: 'users', fill: 1 },
];
  // Visitor Counter Increment Effect
  
  // Fast GSAP & AOS Animations Setup
  useEffect(() => {
    // 1. Fast AOS Initialization
    const linkAos = document.createElement('link');
    linkAos.rel = 'stylesheet';
    linkAos.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(linkAos);

    const scriptAos = document.createElement('script');
    scriptAos.src = 'https://unpkg.com/aos@next/dist/aos.js';
    scriptAos.async = true;
    scriptAos.onload = () => {
      if (window.AOS) {
        window.AOS.init({ duration: 700, once: true });
      }
    };
    document.body.appendChild(scriptAos);

    // 2. Load AOS animations only
    return () => {
      if (document.head.contains(linkAos)) document.head.removeChild(linkAos);
      if (document.body.contains(scriptAos)) document.body.removeChild(scriptAos);
    };
  }, []);

  // Dynamic Tab Data Configuration
  const tabData = {
    natural: {
      img: farming1,
      title: (
        <>
          Organic Veggies &amp; Foods You Cook <span className="hero-green-highlight">Healthy</span>
        </>
      ),
      desc: 'Discover farm-fresh produce sourced directly from trusted growers. Cook nutrient-rich meals, reduce prep time, and nourish your body with wholesome ingredients.'
    },
    handmade: {
      img: farming2,
      title: (
        <>
          Artisanal Handmade Delicacies &amp; <span className="hero-green-highlight">Preserves</span>
        </>
      ),
      desc: 'Hand-crafted in small batches by passionate local culinary creators. Enjoy pure, unadulterated sauces, seasonings, and traditional kitchen staples.'
    },
    curated: {
      img: farming3,
      title: (
        <>
          Handpicked Premium Ingredient <span className="hero-green-highlight">Bundles</span>
        </>
      ),
      desc: 'Curated collections of hard-to-find gourmet ingredients, organic spices, and chef-selected cooking kits designed to elevate every meal.'
    }
  };


  return (
    <div style={{ width: '100%' }}>

      {/* 2. HERO SECTION FROM FRESHFIND-MAIN WITH 2-3 LINES DESCRIPTION */}
      <FindMarketHero
        eyebrow="About FreshFind"
        label="Local food, local people"
        title="Closer to your"
        highlight="community."
        description="FreshFind connects people with local growers, farmers markets and the food that makes every neighbourhood special."
        buttonText="Learn more"
        scrollTarget="about"
        trustTitle="100% Local & Community First"
        trustSubtitle="Supporting regional organic growers"
      />

      <div id="about" style={{ scrollMarginTop: '90px' }}>
        <OrganicFarmSection />
      </div>

    

      {/* 4. TRUSTED ORGANIC FARM SECTION (With Pepper Image Showcase on Right Side) */}
   <section className="trusted-farm-section" id="trusted-farm" data-aos="fade-up">
        <div className="site-container">
          <div className="trusted-grid-wrapper">
            {/* Left Column: 2x2 Grid of 4 Cards */}
            <div className="trusted-cards-2x2">
              <div 
                className="trusted-card-item" 
                data-aos="flip-left" 
                data-aos-easing="ease-out-cubic" 
                data-aos-duration="700"
              >
                <div className="trusted-card-img-wrap">
                  <span className="date-pill-tag">
                    <i className="fa-solid fa-clock"></i> 20 February 2021
                  </span>
                  <img src={gardeningImg} alt="Strategy for Norway's Peion Fund" />
                </div>
                <div className="trusted-card-body">
                  <h3 className="trusted-card-title">Strategy for Norway's Peion Fund Global.</h3>
                </div>
              </div>

              <div 
                className="trusted-card-item" 
                data-aos="flip-left" 
                data-aos-easing="ease-out-cubic" 
                data-aos-duration="700"
              >
                <div className="trusted-card-img-wrap">
                  <span className="date-pill-tag">
                    <i className="fa-solid fa-clock"></i> 20 February 2021
                  </span>
                  <img src={growVegImg} alt="Strategy for Norway's Peion Fund" />
                </div>
                <div className="trusted-card-body">
                  <h3 className="trusted-card-title">Strategy for Norway's Peion Fund Global.</h3>
                </div>
              </div>

              <div 
                className="trusted-card-item" 
                data-aos="flip-left" 
                data-aos-easing="ease-out-cubic" 
                data-aos-duration="700"
              >
                <div className="trusted-card-img-wrap">
                  <span className="date-pill-tag">
                    <i className="fa-solid fa-clock"></i> 20 February 2021
                  </span>
                  <img src={rusticBasketImg} alt="Strategy for Norway's Peion Fund" />
                </div>
                <div className="trusted-card-body">
                  <h3 className="trusted-card-title">Strategy for Norway's Peion Fund Global.</h3>
                </div>
              </div>

              <div 
                className="trusted-card-item" 
                data-aos="flip-left" 
                data-aos-easing="ease-out-cubic" 
                data-aos-duration="700"
              >
                <div className="trusted-card-img-wrap">
                  <span className="date-pill-tag">
                    <i className="fa-solid fa-clock"></i> 20 February 2021
                  </span>
                  <img src={waterCropImg} alt="Strategy for Norway's Peion Fund" />
                </div>
                <div className="trusted-card-body">
                  <h3 className="trusted-card-title">Strategy for Norway's Peion Fund Global.</h3>
                </div>
              </div>
            </div>

            {/* Right Column: Content + Categories List + Pepper Image Showcase on Right Side */}
            <div data-aos="fade-up" data-aos-duration="700">
              
              <h2 className="trusted-heading">
                Trusted Organic Food Store Conscious
              </h2>

              <p className="trusted-description">
                “We are connected by a shared community. Our services are designed to provide reliable and modern solutions. We focus on creating a smooth and enjoyable experience while meeting the needs of our customers. Our goal is to make every interaction simple, effective, and convenient.”
              </p>

              <ul className="trusted-categories-list">
                <li className="trusted-category-item">
                Fruits
                </li>
                <li className="trusted-category-item">
                  Vegetables
                </li>
                <li className="trusted-category-item">
                 Juices
                </li>
                <li className="trusted-category-item">
                 Dried
                </li>
                <li className="trusted-category-item">
                 Breads
                </li>
              </ul>

              {/* Pepper Image Showcase on Right Side of Trusted Farm Section */}
              <div className="pepper-farm-showcase">
  <img
    src={pepperImg}
    alt="Fresh Organic Pepper"
    className="pepper-farm-img"
  />

  <div className="pepper-farm-text">
    <h4>Farm Fresh Pepper</h4>
    <p>
      100% Pesticide-Free, Locally Grown Organic Peppers
    </p>
  </div>
</div>

              <button 
                type="button" 
                className="btn-organic-subscribe"
                onClick={() => alert('Subscribed to Organic Farm Produce!')}
              >
                Subscribe &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC 3-TAB SECTION */}
      <section className="amazing-section-tabs" id="tab-section" data-aos="fade-up" data-aos-duration="700">
        <div className="site-container">
          <div className="tabs-header-bar">
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'natural' ? 'active' : ''}`} 
              onClick={() => setActiveTab('natural')}
            >
              <i className="fa-solid fa-leaf me-1"></i> 100% NATURAL
            </button>
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'handmade' ? 'active' : ''}`} 
              onClick={() => setActiveTab('handmade')}
            >
              <i className="fa-solid fa-hand-holding-heart me-1"></i> HANDMADE
            </button>
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'curated' ? 'active' : ''}`} 
              onClick={() => setActiveTab('curated')}
            >
              <i className="fa-solid fa-box-open me-1"></i> CURATED PRODUCTS
            </button>
          </div>

          <div className="tab-content-card">
            <div>
              <img src={tabData[activeTab].img} alt="Farm Produce" className="tab-hero-img" />
            </div>
            <div>
              <span className="text-success fw-bold">HEALTHY LIVING</span>
              <h2 className="fw-bold mt-2 mb-3">{tabData[activeTab].title}</h2>
              <p className="text-muted">{tabData[activeTab].desc}</p>
              <a href="#team-section" className="btn-organic-subscribe mt-3" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Explore More &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. REFERENCE 3-CIRCLES WIDGET BANNER SECTION ABOVE TEAM MEMBERS */}
       <section className="stats" ref={statsRef} aria-label="FreshFind in numbers">
        <div className="container stats__grid">
          {STATS.map(({ label, to, suffix, icon, fill }, n) => (
            <Reveal key={label} className="stat" delay={n * 120} variant="zoom" style={{ '--fill': RING_C * (1 - fill), '--c': RING_C }}>
              <div className="stat__dial">
                <svg className="stat__svg" viewBox="0 0 148 148" aria-hidden="true">
                  <defs>
                    <linearGradient id={`arc-${n}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ffc47d" /><stop offset="1" stopColor="#f28c28" />
                    </linearGradient>
                  </defs>
                  <circle className="stat__dots" cx="74" cy="74" r="70" />
                  <circle className="stat__track" cx="74" cy="74" r={RING_R} />
                  <circle className="stat__arc" cx="74" cy="74" r={RING_R} stroke={`url(#arc-${n})`} />
                </svg>
                <span className="stat__badge"><Icon name={icon} size={15} /></span>
                <b>{n === 0 ? clockDisplay : ( <Counter to={to} suffix={suffix} delay={n * 120 + 200} /> )} </b>
              </div>
              <span className="stat__label">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. TEAM MEMBERS SECTION */}
      <section id="team-section" className="team-section">
        <div className="site-container">
          <div className="text-center max-width-600 mx-auto mb-5" data-aos="fade-up" data-aos-duration="700">
            <span className="text-success fw-bold">THE PEOPLE BEHIND FRESHFIND</span>
            <h2 className="display-6 fw-bold mt-1">Meet Our Passionate Team</h2>
          </div>

          <div className="team-cards-grid-3col">
            {/* Member 1: Ayesha */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● Executive Lead</span>
              <div className="member-photo-frame">
                <img src={ayeshaImg} alt="Ayesha" />
              </div>
              <h3 className="member-name">Ayesha</h3>
              <div className="member-designation">Founder &amp; Chief Executive Officer</div>
              <p className="member-bio-text">Passionate about revolutionizing home cooking and making healthy food accessible to everyone.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">Leadership</span>
                <span className="skill-pill">Strategy</span>
                <span className="skill-pill">Vision</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>

            {/* Member 2: Aasia */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● Master Chef</span>
              <div className="member-photo-frame">
                <img src={aasiaImg} alt="Aasia" />
              </div>
              <h3 className="member-name">Aasia</h3>
              <div className="member-designation">Head Chef &amp; Culinary Director</div>
              <p className="member-bio-text">Curates world-class organic recipes with a focus on nutrition, taste, and waste reduction.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">Recipes</span>
                <span className="skill-pill">Nutrition</span>
                <span className="skill-pill">Zero Waste</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>

            {/* Member 3: Anqa */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● Design Director</span>
              <div className="member-photo-frame">
                <img src={atqaImg} alt="Anqa" />
              </div>
              <h3 className="member-name">Anqa</h3>
              <div className="member-designation">Lead UI/UX Designer &amp; Product Specialist</div>
              <p className="member-bio-text">Crafts intuitive, visually delightful user experiences for recipe discovery and planning.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">UI/UX</span>
                <span className="skill-pill">Figma</span>
                <span className="skill-pill">Product</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>

            {/* Member 4: Asma */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● Tech Architect</span>
              <div className="member-photo-frame">
                <img src={asmaImg} alt="Asma" />
              </div>
              <h3 className="member-name">Asma</h3>
              <div className="member-designation">Senior Frontend Engineer</div>
              <p className="member-bio-text">Architects fast, responsive web interfaces with seamless animations and interactivity.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">React.js</span>
                <span className="skill-pill">GSAP</span>
                <span className="skill-pill">CSS3</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>

            {/* Member 5: Kinza */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● AI Lead</span>
              <div className="member-photo-frame">
                <img src={kinzaImg} alt="Kinza" />
              </div>
              <h3 className="member-name">Kinza</h3>
              <div className="member-designation">AI &amp; Machine Learning Engineer</div>
              <p className="member-bio-text">Builds intelligent ingredient matching algorithms and personalized recipe generators.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">Python</span>
                <span className="skill-pill">AI Matching</span>
                <span className="skill-pill">ML</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>

            {/* Member 6: Huzaifa */}
            <div 
              className="team-card-interactive" 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="700"
            >
              <span className="member-status-badge">● Growth Lead</span>
              <div className="member-photo-frame">
                <img src={huzaifaImg} alt="Huzaifa" />
              </div>
              <h3 className="member-name">Huzaifa</h3>
              <div className="member-designation">Community &amp; Operations Lead</div>
              <p className="member-bio-text">Drives community engagement and ensures high-quality partnerships with local sellers.</p>

              <div className="skill-pills-row">
                <span className="skill-pill">Growth</span>
                <span className="skill-pill">Sellers</span>
                <span className="skill-pill">Ops</span>
              </div>

              <div className="social-tray-row">
                <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="social-btn-small" title="Fiverr"><span className="fiverr-icon-bold">fi</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

     

 


    </div>
  );
};

export default AboutUs;
