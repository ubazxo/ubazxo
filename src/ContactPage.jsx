import React, { useState, useEffect, useCallback, useRef } from "react";
import "./css/ContactPage.css";

/* --------------------------
   FadeInSection Component
--------------------------- */
const FadeInSection = (props) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const element = domRef.current; // capture element once
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div ref={domRef} className={`fade-in-section ${isVisible ? "is-visible" : ""}`}>
      {props.children}
    </div>
  );
};

/* --------------------------
   ScrollProgressBar Component
--------------------------- */
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
};

/* --------------------------
   BackToTopButton Component
--------------------------- */
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    visible && (
      <div className="back-to-top-container">
        <button
          className="back-to-top"
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="arrow-up">↑</span>
        </button>
        {hovered && <div className="tooltip">Back to Top</div>}
      </div>
    )
  );
};

/* --------------------------
   ContactPage Component
--------------------------- */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Here you can plug in your API call or form handler
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  }, []);

  return (
    <div className="contact-page">
      <ScrollProgressBar />

      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="background-animation"></div>
        <div className="overlay"></div>
        <div className="contact-hero-content">
          <FadeInSection>
            <h1>Contact Us</h1>
            <p>
              We’d love to hear from you! Whether it’s a question, feedback, or
              a project idea, get in touch with us.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <FadeInSection>
            <h2 className="coreloom-colored-heading">Send Us a Message</h2>
          </FadeInSection>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message*"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">
                Send Message →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <FadeInSection>
            <h2>Our Contact Information</h2>
          </FadeInSection>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <h3>Address</h3>
              <p>Toronto, Canada</p>
            </div>
            <div className="contact-info-card">
              <h3>Phone</h3>
              <p>438-399-9615</p>
            </div>
            <div className="contact-info-card">
              <h3>Email</h3>
              <p>info@coreloom.ca</p>
            </div>
          </div>
        </div>
      </section>

      <BackToTopButton />
    </div>
  );
};

export default ContactPage;
