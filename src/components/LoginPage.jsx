import { useState } from 'react';
import logoImg from '/logo.png';
import logInVideo from '/Log-in.mp4';
import './Auth.css';

export default function LoginPage({
  onSwitchToSignUp,
  onLoginSuccess,
  isModal = false,
}) {
  const [loginTab, setLoginTab] = useState('email');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    phone: '',
    otp: '',
    rememberMe: true,
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [loginTouched, setLoginTouched] = useState({});
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // ==========================================
  // LOGIN FIELD VALIDATION
  // ==========================================

  const validateLoginField = (name, value) => {
    let error = '';

    if (loginTab === 'email') {
      if (name === 'email') {
        const val = value.trim();

        if (!val) {
          error = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          error = 'Please enter a valid email address.';
        }
      }

      else if (name === 'password') {
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters.';
        }
      }
    }

    else {
      if (name === 'phone') {
        const val = value.trim();

        if (!val) {
          error = 'Phone number is required.';
        } else if (!/^\+?[0-9\s-]{8,15}$/.test(val)) {
          error = 'Please enter a valid phone number.';
        }
      }

      else if (name === 'otp') {
        if (otpSent && !value.trim()) {
          error = 'OTP code is required.';
        }
      }
    }

    return error;
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleLoginChange = (e) => {
    const { id, type, value, checked } = e.target;

    const val = type === 'checkbox' ? checked : value;

    const updated = {
      ...loginForm,
      [id]: val,
    };

    setLoginForm(updated);

    if (loginTouched[id]) {
      const err = validateLoginField(id, val);

      setLoginErrors((prev) => ({
        ...prev,
        [id]: err,
      }));
    }
  };

  // ==========================================
  // HANDLE INPUT BLUR
  // ==========================================

  const handleLoginBlur = (e) => {
    const { id, type, value, checked } = e.target;

    const val = type === 'checkbox' ? checked : value;

    setLoginTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const err = validateLoginField(id, val);

    setLoginErrors((prev) => ({
      ...prev,
      [id]: err,
    }));
  };

  // ==========================================
  // LOGIN SUBMIT
  // ==========================================

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const fieldsToValidate =
      loginTab === 'email'
        ? ['email', 'password']
        : ['phone'];

    if (loginTab === 'otp' && otpSent) {
      fieldsToValidate.push('otp');
    }

    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;

      const err = validateLoginField(
        field,
        loginForm[field]
      );

      if (err) {
        newErrors[field] = err;
      }
    });

    setLoginTouched((prev) => ({
      ...prev,
      ...newTouched,
    }));

    setLoginErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      // OTP SEND
      if (loginTab === 'otp' && !otpSent) {
        setOtpSent(true);

        alert(
          'OTP code sent successfully to your phone!'
        );

        return;
      }

      // LOGIN SUCCESS
      setIsLoggedIn(true);

      if (onLoginSuccess) {
        onLoginSuccess(loginForm);
      }
    }
  };

  // ==========================================
  // RESET LOGIN
  // ==========================================

  const handleReset = () => {
    setLoginForm({
      email: '',
      password: '',
      phone: '',
      otp: '',
      rememberMe: true,
    });

    setLoginErrors({});
    setLoginTouched({});
    setIsLoggedIn(false);
    setOtpSent(false);
    setShowLoginPassword(false);
  };

  return (
    <div
      className={`page ${
        isModal ? 'login-page-modal' : ''
      }`}
    >

      {/* ==========================================
          LEFT VISUAL SECTION
      ========================================== */}

      <section className="login-visual">

        <video
          src={logInVideo}
          autoPlay
          loop
          muted
          playsInline
          className="visual-video-full"
        />

        <div className="video-overlay-light"></div>

        <div className="circle one"></div>
        <div className="circle two"></div>

        <div className="login-visual-centered">

          <div className="logo">
            <img
              src={logoImg}
              alt="FreshFind Logo"
              className="logo-img"
            />
          </div>

          <h2 className="login-hero-title">
            Welcome to <span>FreshFind</span>.
            <br />
            The Largest Fresh Marketplace.
          </h2>

          <p className="login-hero-sub">
            One-stop wholesale & retail solution
            for farm-fresh products. We ensure top
            product quality, fast delivery, and
            hassle-free service.
          </p>

          <div className="trust-badge">

            <div className="avatar-group">

              <div className="avatar-circle a1">
                🌿
              </div>

              <div className="avatar-circle a2">
                🥬
              </div>

              <div className="avatar-circle a3">
                🛒
              </div>

            </div>

            <span className="trust-text">
              20k+ buyers joined with us, now it's your turn
            </span>

          </div>

        </div>
      </section>


      {/* ==========================================
          RIGHT FORM SECTION
      ========================================== */}

      <section className="form-side">

        <div className="form-wrap">

          {!isLoggedIn ? (

            <>

              {/* TOP LINE */}

              <div className="topline">

                <span className="welcome">
                  WELCOME BACK TO FRESHFIND
                </span>

             

              </div>


              {/* TITLE */}

              <h2>Log in</h2>

              <p className="subtitle">
                Manage your orders and discover fresh deals.
              </p>


              {/* ==========================================
                  LOGIN TABS
              ========================================== */}

              <div className="login-tabs">

                <button
                  type="button"
                  className={`tab-btn ${
                    loginTab === 'email'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setLoginTab('email');
                    setLoginErrors({});
                    setLoginTouched({});
                    setOtpSent(false);
                  }}
                >
                  With E-mail
                </button>

                <button
                  type="button"
                  className={`tab-btn ${
                    loginTab === 'otp'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setLoginTab('otp');
                    setLoginErrors({});
                    setLoginTouched({});
                  }}
                >
                  With OTP
                </button>

              </div>


              {/* ==========================================
                  LOGIN FORM
              ========================================== */}

              <form
                onSubmit={handleLoginSubmit}
                noValidate
              >

                {loginTab === 'email' ? (

                  <>

                    {/* EMAIL */}

                    <div
                      className={`field ${
                        loginTouched.email &&
                        loginErrors.email
                          ? 'has-error'
                          : ''
                      }`}
                    >

                      <label htmlFor="email">
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="contact@example.com"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        onBlur={handleLoginBlur}
                        aria-invalid={
                          !!(
                            loginTouched.email &&
                            loginErrors.email
                          )
                        }
                      />

                      {loginTouched.email &&
                        loginErrors.email && (
                          <div className="field-error">
                            <span>⚠️</span>
                            {loginErrors.email}
                          </div>
                        )}

                    </div>


                    {/* PASSWORD */}

                    <div
                      className={`field ${
                        loginTouched.password &&
                        loginErrors.password
                          ? 'has-error'
                          : ''
                      }`}
                    >

                      <label htmlFor="password">
                        Password
                      </label>

                      <div className="password-wrapper">

                        <input
                          id="password"
                          type={
                            showLoginPassword
                              ? 'text'
                              : 'password'
                          }
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          onBlur={handleLoginBlur}
                          aria-invalid={
                            !!(
                              loginTouched.password &&
                              loginErrors.password
                            )
                          }
                        />

                        <button
                          className="eye"
                          type="button"
                          onClick={() =>
                            setShowLoginPassword(
                              !showLoginPassword
                            )
                          }
                          aria-label={
                            showLoginPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showLoginPassword
                            ? '👁️'
                            : '👁️‍🗨️'}
                        </button>

                      </div>

                      {loginTouched.password &&
                        loginErrors.password && (
                          <div className="field-error">
                            <span>⚠️</span>
                            {loginErrors.password}
                          </div>
                        )}

                    </div>

                  </>

                ) : (

                  <>

                    {/* PHONE */}

                    <div
                      className={`field ${
                        loginTouched.phone &&
                        loginErrors.phone
                          ? 'has-error'
                          : ''
                      }`}
                    >

                      <label htmlFor="phone">
                        Mobile phone number
                      </label>

                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                        }}
                      >

                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={loginForm.phone}
                          onChange={handleLoginChange}
                          onBlur={handleLoginBlur}
                          aria-invalid={
                            !!(
                              loginTouched.phone &&
                              loginErrors.phone
                            )
                          }
                        />

                        <button
                          type="button"
                          className="otp-send-btn"
                          onClick={() => {

                            const err =
                              validateLoginField(
                                'phone',
                                loginForm.phone
                              );

                            if (
                              !err &&
                              loginForm.phone
                            ) {

                              setOtpSent(true);

                              alert(
                                `OTP code sent to ${loginForm.phone}`
                              );

                            } else {

                              setLoginTouched((prev) => ({
                                ...prev,
                                phone: true,
                              }));

                              setLoginErrors((prev) => ({
                                ...prev,
                                phone:
                                  err ||
                                  'Enter phone number first',
                              }));

                            }

                          }}
                        >
                          {otpSent
                            ? 'Resend'
                            : 'Send OTP'}
                        </button>

                      </div>

                      {loginTouched.phone &&
                        loginErrors.phone && (
                          <div className="field-error">
                            <span>⚠️</span>
                            {loginErrors.phone}
                          </div>
                        )}

                    </div>


                    {/* OTP */}

                    {otpSent && (

                      <div
                        className={`field ${
                          loginTouched.otp &&
                          loginErrors.otp
                            ? 'has-error'
                            : ''
                        }`}
                      >

                        <label htmlFor="otp">
                          Enter 6-digit OTP code
                        </label>

                        <input
                          id="otp"
                          type="text"
                          placeholder="123456"
                          value={loginForm.otp}
                          onChange={handleLoginChange}
                          onBlur={handleLoginBlur}
                          aria-invalid={
                            !!(
                              loginTouched.otp &&
                              loginErrors.otp
                            )
                          }
                        />

                        {loginTouched.otp &&
                          loginErrors.otp && (
                            <div className="field-error">
                              <span>⚠️</span>
                              {loginErrors.otp}
                            </div>
                          )}

                      </div>

                    )}

                  </>

                )}


                {/* ==========================================
                    OPTIONS
                ========================================== */}

                <div className="options-row">

                  <label className="remember-me">

                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={
                        loginForm.rememberMe
                      }
                      onChange={handleLoginChange}
                    />

                    <span>
                      Remember me
                    </span>

                  </label>

                  <a
                    href="#forgot"
                    className="forgot-link"
                  >
                    Forgot Password?
                  </a>

                </div>


                {/* LOGIN BUTTON */}

                <button
                  className="login-submit-btn"
                  type="submit"
                >
                  Log in
                </button>

              </form>


              {/* ==========================================
                  SOCIAL LOGIN
              ========================================== */}

         


              {/* HELP */}

            

            </>

          ) : (

            /* ==========================================
                SUCCESS CARD
            ========================================== */

            <div className="success-card">

              <div className="success-icon">
                🌿
              </div>

              <h3>
                Welcome Back!
              </h3>

              <p>
                You have logged in successfully
                to your{' '}
                <strong>FreshFind</strong>{' '}
                account.
              </p>

              <div className="user-badge">

                <div>
                  <strong>
                    Identifier:
                  </strong>{' '}

                  {loginTab === 'email'
                    ? loginForm.email
                    : loginForm.phone}
                </div>

                <div>
                  <strong>
                    Session:
                  </strong>{' '}
                  Active
                </div>

              </div>

              <button
                className="reset-btn"
                type="button"
                onClick={handleReset}
              >
                Log Out
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}