import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="page">
      <h1>📧 Contact Us</h1>
      <p>Have a question? Send us a message below.</p>

      {submitted ? (
        <div style={{
          background: "#e8f5e9",
          border: "2px solid #4caf50",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          margin: "20px auto",
          maxWidth: "600px"
        }}>
          <h2 style={{ color: "#2e7d32", marginTop: 0 }}>✓ Thank You!</h2>
          <p style={{ color: "#558b2f" }}>Your message has been sent successfully.</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
    </div>
  );
}