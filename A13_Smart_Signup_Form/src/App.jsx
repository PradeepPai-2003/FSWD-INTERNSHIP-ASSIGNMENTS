import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    uppercase: false,
    number: false,
    special: false,
    length: false
  });

  // Real-time password strength validation
  const validatePasswordStrength = (password) => {
    const strength = {
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      length: password.length >= 8
    };
    setPasswordStrength(strength);
    return strength;
  };

  // Handle input change with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time password validation
    if (name === "password") {
      validatePasswordStrength(value);
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation function
  const validate = () => {
    let newErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordStrength.uppercase) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!passwordStrength.number) {
      newErrors.password = "Password must contain a number";
    } else if (!passwordStrength.special) {
      newErrors.password = "Password must contain a special character";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log("Form submitted:", form);

      // Reset form after 3 seconds
      setTimeout(() => {
        setForm({ email: "", password: "", confirmPassword: "" });
        setSubmitted(false);
        setPasswordStrength({
          uppercase: false,
          number: false,
          special: false,
          length: false
        });
      }, 3000);
    }
  };

  return (
    <div className="app-container">
      {submitted ? (
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Welcome! 🎉</h2>
          <p>Your account has been created successfully!</p>
          <p className="success-email">Email: {form.email}</p>
        </div>
      ) : (
        <div className="form-container">
          <div className="form-header">
            <h1>📝 Smart Signup</h1>
            <p>Create your account securely</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {/* Email Field */}
            <div className="form-group">
              <label>📧 Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>🔐 Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}

              {/* Password Strength Indicator */}
              <div className="password-strength">
                <div className={`strength-rule ${passwordStrength.uppercase ? "met" : ""}`}>
                  {passwordStrength.uppercase ? "✓" : "○"} Uppercase letter (A-Z)
                </div>
                <div className={`strength-rule ${passwordStrength.number ? "met" : ""}`}>
                  {passwordStrength.number ? "✓" : "○"} Number (0-9)
                </div>
                <div className={`strength-rule ${passwordStrength.special ? "met" : ""}`}>
                  {passwordStrength.special ? "✓" : "○"} Special character (!@#$...)
                </div>
                <div className={`strength-rule ${passwordStrength.length ? "met" : ""}`}>
                  {passwordStrength.length ? "✓" : "○"} At least 8 characters
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label>🔒 Confirm Password</label>
              <div className="password-input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;