import { useState } from "react";
import logoImg from "/logo.png";
import logInVideo from '/Log-in.mp4';
import "./Auth.css";

export default function SignUpPage({
  onSwitchToLogin,
  onSignUpSuccess,
  isModal = false,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // =========================
  // FIELD VALIDATION
  // =========================
  const validateField = (name, value, allValues = formData) => {
    let error = "";

    switch (name) {
      case "firstName": {
        const val = value.trim();

        if (!val) {
          error = "First name is required.";
        } else if (val.length < 2) {
          error = "First name must be at least 2 characters.";
        } else if (!/^[a-zA-Z\s'-]+$/.test(val)) {
          error =
            "First name can only contain letters, spaces, and hyphens.";
        }

        break;
      }

      case "lastName": {
        const val = value.trim();

        if (!val) {
          error = "Last name is required.";
        } else if (val.length < 2) {
          error = "Last name must be at least 2 characters.";
        } else if (!/^[a-zA-Z\s'-]+$/.test(val)) {
          error =
            "Last name can only contain letters, spaces, and hyphens.";
        }

        break;
      }

      case "email": {
        const val = value.trim();

        if (!val) {
          error = "Email address is required.";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
        ) {
          error = "Please enter a valid email address.";
        }

        break;
      }

      case "password": {
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(value)) {
          error =
            "Password must contain at least one uppercase letter (A-Z).";
        } else if (!/[a-z]/.test(value)) {
          error =
            "Password must contain at least one lowercase letter (a-z).";
        } else if (!/[0-9]/.test(value)) {
          error =
            "Password must contain at least one number (0-9).";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
          error =
            "Password must contain at least one special character (!@#$%).";
        }

        break;
      }

      case "confirmPassword": {
        if (!value) {
          error = "Please confirm your password.";
        } else if (value !== allValues.password) {
          error = "Passwords do not match.";
        }

        break;
      }

      case "agreeTerms": {
        if (!value) {
          error =
            "You must agree to the Terms & Conditions and Privacy Policy.";
        }

        break;
      }

      default:
        break;
    }

    return error;
  };

  // =========================
  // VALIDATE ALL FIELDS
  // =========================
  const validateAll = (data) => {
    const newErrors = {};

    Object.keys(data).forEach((field) => {
      const err = validateField(field, data[field], data);

      if (err) {
        newErrors[field] = err;
      }
    });

    return newErrors;
  };

  // =========================
  // PASSWORD CRITERIA
  // =========================
  const passwordCriteria = {
    length: formData.password.length >= 8,

    casing:
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password),

    number: /[0-9]/.test(formData.password),

    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  // =========================
  // PASSWORD STRENGTH
  // =========================
  const getPasswordStrength = () => {
    if (!formData.password) {
      return {
        score: 0,
        label: "",
        class: "",
      };
    }

    const metCount =
      Object.values(passwordCriteria).filter(Boolean).length;

    if (metCount <= 2) {
      return {
        score: 1,
        label: "Weak",
        class: "weak",
      };
    }

    if (metCount === 3) {
      return {
        score: 2,
        label: "Medium",
        class: "medium",
      };
    }

    return {
      score: 3,
      label: "Strong",
      class: "strong",
    };
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const {
      id,
      type,
      value,
      checked,
    } = e.target;

    const fieldValue =
      type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [id]: fieldValue,
    };

    setFormData(updatedFormData);

    if (touched[id]) {
      const fieldError = validateField(
        id,
        fieldValue,
        updatedFormData
      );

      setErrors((prev) => ({
        ...prev,
        [id]: fieldError,
      }));
    }

    // Revalidate confirm password
    if (id === "password" && touched.confirmPassword) {
      const confirmErr = validateField(
        "confirmPassword",
        formData.confirmPassword,
        updatedFormData
      );

      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmErr,
      }));
    }
  };

  // =========================
  // INPUT BLUR
  // =========================
  const handleBlur = (e) => {
    const {
      id,
      type,
      value,
      checked,
    } = e.target;

    const fieldValue =
      type === "checkbox" ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const fieldError = validateField(
      id,
      fieldValue,
      formData
    );

    setErrors((prev) => ({
      ...prev,
      [id]: fieldError,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    };

    setTouched(allTouched);

    const validationErrors = validateAll(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);

      if (onSignUpSuccess) {
        onSignUpSuccess(formData);
      }
    }
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });

    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const strength = getPasswordStrength();

  return (
    <div
      className={`page ${
        isModal ? "signup-page-modal" : ""
      }`}
    >
      {/* =========================================
          LEFT VISUAL SECTION
      ========================================= */}
      <section className="visual">
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
        </div>
      </section>

      {/* =========================================
          RIGHT FORM SECTION
      ========================================= */}
      <section className="form-side">
        <div className="form-wrap">
          {!isSubmitted ? (
            <>
              {/* TOP LINE */}
              <div className="topline">
                <span className="welcome">
                  WELCOME TO FRESHFIND
                </span>

                {onSwitchToLogin && (
                  <button
                    type="button"
                    className="login-btn"
                    onClick={onSwitchToLogin}
                  >
                    Log in
                  </button>
                )}
              </div>

              <h2>Create account</h2>

              <p className="subtitle">
                Start your FreshFind journey today.
              </p>

              {/* =========================================
                  FORM
              ========================================= */}
              <form
                onSubmit={handleSubmit}
                noValidate
              >
                {/* FIRST + LAST NAME */}
                <div className="row">

                  {/* FIRST NAME */}
                  <div
                    className={`field ${
                      touched.firstName &&
                      errors.firstName
                        ? "has-error"
                        : ""
                    }`}
                  >
                    <label htmlFor="firstName">
                      First name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={
                        !!(
                          touched.firstName &&
                          errors.firstName
                        )
                      }
                    />

                    {touched.firstName &&
                      errors.firstName && (
                        <div className="field-error">
                          <span>⚠️</span>
                          {errors.firstName}
                        </div>
                      )}
                  </div>

                  {/* LAST NAME */}
                  <div
                    className={`field ${
                      touched.lastName &&
                      errors.lastName
                        ? "has-error"
                        : ""
                    }`}
                  >
                    <label htmlFor="lastName">
                      Last name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={
                        !!(
                          touched.lastName &&
                          errors.lastName
                        )
                      }
                    />

                    {touched.lastName &&
                      errors.lastName && (
                        <div className="field-error">
                          <span>⚠️</span>
                          {errors.lastName}
                        </div>
                      )}
                  </div>
                </div>

                {/* EMAIL */}
                <div
                  className={`field ${
                    touched.email &&
                    errors.email
                      ? "has-error"
                      : ""
                  }`}
                >
                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={
                      !!(
                        touched.email &&
                        errors.email
                      )
                    }
                  />

                  {touched.email &&
                    errors.email && (
                      <div className="field-error">
                        <span>⚠️</span>
                        {errors.email}
                      </div>
                    )}
                </div>

                {/* PASSWORD */}
                <div
                  className={`field ${
                    touched.password &&
                    errors.password
                      ? "has-error"
                      : ""
                  }`}
                >
                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={
                        !!(
                          touched.password &&
                          errors.password
                        )
                      }
                    />

                    <button
                      type="button"
                      className="eye"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword
                        ? "👁️"
                        : "👁️‍🗨️"}
                    </button>
                  </div>

                  {/* PASSWORD STRENGTH */}
                  {formData.password && (
                    <div className="strength-meter">

                      <div className="strength-bar-bg">
                        <div
                          className={`strength-bar-fill ${strength.class}`}
                        ></div>
                      </div>

                      <div
                        className={`strength-label ${strength.class}`}
                      >
                        <span>Strength</span>
                        <span>
                          {strength.label}
                        </span>
                      </div>

                      <div className="password-rules">

                        <span
                          className={`rule-item ${
                            passwordCriteria.length
                              ? "met"
                              : ""
                          }`}
                        >
                          {passwordCriteria.length
                            ? "✓"
                            : "•"}{" "}
                          8+ chars
                        </span>

                        <span
                          className={`rule-item ${
                            passwordCriteria.casing
                              ? "met"
                              : ""
                          }`}
                        >
                          {passwordCriteria.casing
                            ? "✓"
                            : "•"}{" "}
                          Aa letters
                        </span>

                        <span
                          className={`rule-item ${
                            passwordCriteria.number
                              ? "met"
                              : ""
                          }`}
                        >
                          {passwordCriteria.number
                            ? "✓"
                            : "•"}{" "}
                          0-9 number
                        </span>

                        <span
                          className={`rule-item ${
                            passwordCriteria.special
                              ? "met"
                              : ""
                          }`}
                        >
                          {passwordCriteria.special
                            ? "✓"
                            : "•"}{" "}
                          Symbol (!@#$)
                        </span>

                      </div>
                    </div>
                  )}

                  {touched.password &&
                    errors.password && (
                      <div className="field-error">
                        <span>⚠️</span>
                        {errors.password}
                      </div>
                    )}
                </div>

            
                {/* SUBMIT */}
                <button
                  className="login-submit-btn"
                  type="submit"
                >
                  Create account
                </button>
              </form>

        

              {/* BOTTOM LOGIN */}
              <p className="bottom">
                Already have an account?{" "}

                {onSwitchToLogin && (
                  <span
                    className="bottom-login-btn"
                    onClick={onSwitchToLogin}
                  >
                    Log in
                  </span>
                )}
              </p>
            </>
          ) : (
            /* =========================================
               SUCCESS CARD
            ========================================= */
            <div className="success-card">

              <div className="success-icon">
                🎉
              </div>

              <h3>Account Created!</h3>

              <p>
                Welcome to FreshFind,{" "}
                <strong>
                  {formData.firstName}
                </strong>
                ! Your account has been set up
                successfully.
              </p>

              <div className="user-badge">

                <div>
                  <strong>Full Name:</strong>{" "}
                  {formData.firstName}{" "}
                  {formData.lastName}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {formData.email}
                </div>

              </div>

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Create Another Account
              </button>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}