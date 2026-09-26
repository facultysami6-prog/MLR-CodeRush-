import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '././css/Footer.css';

const Footer = () => {
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    alert(`Thank you for subscribing with ${emailInput}! Welcome to FreshFind.`);
    setEmailInput('');
  };

  return (
    <footer className="unique-organic-footer">
      <div className="footer-decor-leaf">🌿</div>
      <div className="site-container">
        <div className="footer-grid-4col">
          {/* Column 1: Brand Info & Socials */}
          <div>
            <div className="footer-brand-title">
              <span style={{ fontSize: '1.6rem' }}>🥗</span> FreshFind
            </div>
            <p className="footer-brand-desc">
              Connecting home cooks with fresh organic produce, zero-waste meal planners, and smart culinary AI tools to make healthy living effortless.
            </p>
            <div className="footer-social-row">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Facebook" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Instagram" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Fiverr" aria-label="Fiverr">
                <span className="footer-fiverr-icon">fi</span>
              </a>
              <a href="https://www.linkedin.com/in/ayesha-khan-467b10413" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="LinkedIn" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/AyeshaArif739" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="GitHub" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-heading">Explore</h4>
            <ul className="footer-nav-list">
              <li><Link to="/"><i className="fa-solid fa-angle-right"></i> Home</Link></li>
              <li><Link to="/markets"><i className="fa-solid fa-angle-right"></i> Market Directory</Link></li>
              <li><Link to="/products"><i className="fa-solid fa-angle-right"></i> Products Catalogue</Link></li>
              <li><Link to="/about"><i className="fa-solid fa-angle-right"></i> About Us</Link></li>
              <li><Link to="/contact"><i className="fa-solid fa-angle-right"></i> Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="footer-col-heading">Categories</h4>
            <ul className="footer-nav-list">
              <li><Link to="/products"><i className="fa-solid fa-leaf"></i> Fresh Fruits</Link></li>
              <li><Link to="/products"><i className="fa-solid fa-leaf"></i> Organic Veggies</Link></li>
              <li><Link to="/products"><i className="fa-solid fa-leaf"></i> Natural Dairy</Link></li>
              <li><Link to="/products"><i className="fa-solid fa-leaf"></i> Farm Herbs</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h4 className="footer-col-heading">Stay Seasoned</h4>
            <div className="footer-newsletter-card">
              <p>Subscribe to receive weekly organic recipe guides, farm updates, and exclusive deals.</p>
              <form onSubmit={handleSubscribe}>
                <div className="footer-input-group">
                  <input 
                    type="email" 
                    className="footer-input-field" 
                    placeholder="Enter your email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required 
                  />
                  <button type="submit" className="footer-subscribe-btn">
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} FreshFind Platform. Created by Ayesha, Aasia, Anqa, Asma, Kinza &amp; Huzaifa. All rights reserved.
          </div>
          <div>
            🌿 100% Certified Organic Theme &bull; Powered by React.js, GSAP &amp; AOS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;