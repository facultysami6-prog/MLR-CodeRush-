
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!emailInput.trim()) return;

    alert(
      `Thank you for subscribing with ${emailInput}! Welcome to FreshFind.`
    );

    setEmailInput("");
  };

  return (
    <footer className="unique-organic-footer" role="contentinfo">
      <div className="footer-decor-leaf" aria-hidden="true">
        🌿
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-brand-title">
              <span
                className="footer-brand-icon"
                role="img"
                aria-label="salad"
              >
                <img src="/logo.png" alt="FreshFind Logo" style={{ width: "40%", height: "auto", margin: "0 auto" }} />
              </span>
            </Link>

            <p className="footer-brand-desc">
              Connecting home cooks with fresh organic produce, zero-waste
              meal planners, and smart culinary AI tools to make healthy
              living effortless.
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

          <div className="footer-links">
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Explore</h4>

              <ul className="footer-nav-list">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Home</span>
                  </Link>
                </li>

                <li>
                  <Link to="/markets">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Market Directory</span>
                  </Link>
                </li>

                <li>
                  <Link to="/find-market">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Find Market</span>
                  </Link>
                </li>

                <li>
                  <Link to="/products">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Products Catalogue</span>
                  </Link>
                </li>

                <li>
                  <Link to="/about">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>About Us</span>
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Categories</h4>

              <ul className="footer-nav-list">
                <li>
                  <Link to="/products?category=Fruits#products-catalogue">
                    <i className="fa-solid fa-leaf"></i>
                    <span>Fresh Fruits</span>
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Vegetables#products-catalogue">
                    <i className="fa-solid fa-leaf"></i>
                    <span>Organic Veggies</span>
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Dairy#products-catalogue">
                    <i className="fa-solid fa-leaf"></i>
                    <span>Natural Dairy</span>
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Herbs#products-catalogue">
                    <i className="fa-solid fa-leaf"></i>
                    <span>Farm Herbs</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-col-heading">Stay Seasoned</h4>

            <div className="footer-newsletter-card">
              <p>
                Subscribe to receive weekly organic recipe guides, farm
                updates, and exclusive deals.
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

                  <button
                    type="submit"
                    className="footer-subscribe-btn"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} FreshFind Platform. Created by
            Ayesha, Aasia, Anqa, Asma, Kinza &amp; Huzaifa. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

