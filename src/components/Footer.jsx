import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    alert(
      `Thank you for subscribing with ${emailInput}! Welcome to FreshFind.`,
    );
    setEmailInput("");
  };

  return (
    <footer className="unique-organic-footer" role="contentinfo">
      <div className="footer-decor-leaf" aria-hidden="true">
        🌿
      </div>
      <div className="site-container footer-container">
        <div className="footer-grid-4col">
          {/* Column 1: Brand Info & Socials */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-title">
              <span className="footer-brand-icon" role="img" aria-label="salad">
                🥗
              </span>
              <span>FreshFind</span>
            </Link>
            <p className="footer-brand-desc">
              Connecting home cooks with fresh organic produce, zero-waste meal
              planners, and smart culinary AI tools to make healthy living
              effortless.
            </p>
            <div className="footer-social-row" aria-label="Social links">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.fiverr.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Fiverr"
                aria-label="Fiverr"
              >
                <span className="footer-fiverr-icon">fi</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayesha-khan-467b10413"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/AyeshaArif739"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="GitHub"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          {/* Links Section: Quick Links & Categories */}
          <div className="footer-links-group">
            {/* Column 2: Quick Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Explore</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-angle-right"></i> Home
                  </Link>
                </li>
                <li>
                  <Link to="/markets">
                    <i className="fa-solid fa-angle-right"></i> Market Directory
                  </Link>
                </li>
                <li>
                  <Link to="/find-market">
                    <i className="fa-solid fa-angle-right"></i> Find Market
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <i className="fa-solid fa-angle-right"></i> Products
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <i className="fa-solid fa-angle-right"></i> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <i className="fa-solid fa-angle-right"></i> Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Categories</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/products?category=Fruits#products-catalogue">
                    <i className="fa-solid fa-leaf"></i> Fresh Fruits
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Vegetables#products-catalogue">
                    <i className="fa-solid fa-leaf"></i> Organic Veggies
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Dairy#products-catalogue">
                    <i className="fa-solid fa-leaf"></i> Natural Dairy
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Herbs#products-catalogue">
                    <i className="fa-solid fa-leaf"></i> Farm Herbs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="footer-col-newsletter">
            <h4 className="footer-col-heading">Stay Seasoned</h4>
            <div className="footer-newsletter-card">
              <p>
                Subscribe to receive weekly organic recipe guides, farm updates,
                and exclusive deals.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="footer-newsletter-form"
              >
                <div className="footer-input-group">
                  <input
                    type="email"
                    className="footer-input-field"
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    aria-label="Your email address"
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
          <p className="footer-copyright">
            © {new Date().getFullYear()} FreshFind Platform. Created by Ayesha,
            Aasia, Anqa, Asma, Kinza &amp; Huzaifa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
