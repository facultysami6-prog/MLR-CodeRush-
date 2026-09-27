import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icons";
import LoginPage from "./LoginPage";
import SighUpPage from "./SignUpPage";
import SignUpPage from "./SignUpPage";

export default function WavyHeaderNav({
  bookmarkCount = 0,
  onOpenBookmarks,
}) {
  const navItems = [
    { id: "home", label: "Home", to: "/" },
    { id: "find-market", label: "Find Market", to: "/find-market" },
    { id: "markets", label: "Market Directory", to: "/markets" },
    { id: "products", label: "Produce Guide", to: "/products" },
    { id: "about", label: "About Us", to: "/about" },
    { id: "contact", label: "Contact", to: "/contact" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  

  const closeSidebar = () => setIsSidebarOpen(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeSidebar();
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
    closeSidebar();
  };
  
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  useEffect(() => {
    const SCROLL_THRESHOLD = 40;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    if (
      isSidebarOpen ||
      isLoginModalOpen ||
      isSignUpModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isLoginModalOpen) {
          closeLoginModal();
        } else if (isSidebarOpen) {
          closeSidebar();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isSidebarOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
  ]);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (isLoginModalOpen) {
        closeLoginModal();
      } else if (isSignUpModalOpen) {
        closeSignUpModal();
      } else if (isSidebarOpen) {
        closeSidebar();
      }
    }
  };

  return (
    <div
      className={`greennest-navbar-container ${
        isScrolled ? "is-scrolled" : ""
      }`}
    >
      <nav className="greennest-navbar">

        
        <Link to="/" className="logo" onClick={closeSidebar}>
          <img
            src="/logo.png"
            alt="FreshFind Logo"
            className="logo-brand-img"
          />
        </Link>

    
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

  
        <div className="auth-buttons">

    
          <button
            type="button"
            className="login-btn"
            onClick={openLoginModal}
          >
            Login
          </button>

       
          <button
  type="button"
  className="signup-btn"
  onClick={openSignUpModal}
>
  Signup
</button>

        </div>

    
        <div className="nav-right-group">

          
<button
  type="button"
  onClick={onOpenBookmarks}
  className="nav-button nav-button-icon-only cursor-pointer"
  aria-label="Open Bookmarks Drawer"
  title="Open Bookmarks Drawer"
>
  <span className="bookmark-icon-shell">
    <Icon name="bookmark" size={30} />

    {bookmarkCount > 0 && (
      <span className="bookmark-count-badge">
        {bookmarkCount}
      </span>
    )}
  </span>
</button>

      
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
          >
            <Icon name="menu" size={24} />
          </button>

        </div>
      </nav>


      <div
        className={`sidebar-overlay ${
          isSidebarOpen ? "is-open" : ""
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />


      <aside
        className={`mobile-sidebar ${
          isSidebarOpen ? "is-open" : ""
        }`}
        aria-hidden={!isSidebarOpen}
      >


        <div className="mobile-sidebar-header">

          <Link
            to="/"
            className="logo"
            onClick={closeSidebar}
          >
            <img
              src="/logo.png"
              alt="FreshFind Logo"
              className="logo-brand-img"
            />

            <span className="logo-text">
              Fresh<span>Find</span>
            </span>
          </Link>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <Icon name="close" size={22} />
          </button>

        </div>

   
        <div className="mobile-sidebar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              onClick={closeSidebar}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

 
        <div className="mobile-sidebar-auth">

         
          <button
            type="button"
            className="login-btn"
            onClick={openLoginModal}
          >
            Login
          </button>

     
          <button
  type="button"
  className="signup-btn"
  onClick={openSignUpModal}
>
  Signup
</button>

        </div>

   
        <button
          type="button"
          onClick={() => {
            onOpenBookmarks();
            closeSidebar();
          }}
          className="nav-button mobile-sidebar-cta cursor-pointer"
          title="Open Bookmarks Drawer"
        >
          <Icon name="bookmark" size={18} />

          <span>Bookmarks</span>

          {bookmarkCount > 0 && (
            <span className="bookmark-count-badge">
              {bookmarkCount}
            </span>
          )}

          <span className="arrow">→</span>
        </button>
      </aside>

    
      {isLoginModalOpen && (
        <div
          className="login-modal-overlay"
          onClick={closeLoginModal}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >

      
            <button
              type="button"
              className="login-modal-close"
              onClick={closeLoginModal}
              aria-label="Close login"
              title="Close"
            >
              ×
            </button>

      
            <LoginPage
              isModal={true}

              onSwitchToSignUp={() => {
                closeLoginModal();
              }}

              onLoginSuccess={() => {
                closeLoginModal();
              }}
            />

          </div>
        </div>
      )}


    {isSignUpModalOpen && ( <div className="login-modal-overlay" onClick={closeSignUpModal} > <div className="login-modal signup-modal" onClick={(e) => e.stopPropagation()} > {/* CLOSE BUTTON */} <button type="button" className="login-modal-close" onClick={closeSignUpModal} aria-label="Close signup" title="Close" > × </button> {/* SIGNUP PAGE */} <SignUpPage isModal={true} onSwitchToLogin={() => { closeSignUpModal(); openLoginModal(); }} onSignUpSuccess={() => { closeSignUpModal(); }} /> </div> </div> )}
    </div>
  );
}