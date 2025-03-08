import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import FadeInSection from "./components/FadeInSection";
import "./css/HeroSection.css";
import AiVideo from './assets/vids/Ai.mp4';
import PioneerVideo from './assets/vids/Pioneer.mp4';
import LocateUsImg from './assets/imgs/LocateUs.jpg';
import InovationImg from './assets/imgs/Inovation.jpg';
import ExcellenceImg from './assets/imgs/Excellence.jpg';
import SuccessStoriesImg from './assets/imgs/SuccessStories.jpg';

// Simple Modal Component (instead of importing)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

// Simple GetAnswersForm Component (instead of importing)
const GetAnswersForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <section className="get-answers-form">
      <h2>Let's Transform Your Business</h2>
      <p>
        Ready to leverage cutting-edge technology for your business? 
        Get in touch with our experts and discover how we can help you innovate.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Full Name*" 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Business Email*" 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Company Name*" 
            required 
          />
        </div>
        <div className="form-group">
          <select required defaultValue="">
            <option value="" disabled>Select Service*</option>
            <option value="ai">AI Solutions</option>
            <option value="cloud">Cloud Services</option>
            <option value="development">Custom Development</option>
            <option value="consulting">Technical Consulting</option>
          </select>
        </div>
        <div className="form-group">
          <textarea 
            placeholder="Tell us about your project*" 
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          <span>Get Started</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </section>
  );
};

/* =====================================================
   Scroll Progress Bar Component
===================================================== */
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

/* =====================================================
   BackToTopButton Component
===================================================== */
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

/* =====================================================
   Enhanced Hero Section
===================================================== */
const Hero = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <section className="hero-container">
      <div className={`hero-background ${isVideoLoading ? 'loading' : ''}`}>
        <motion.video
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoading(false)}
          style={{ 
            opacity: isVideoLoading ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
        >
          <source src={AiVideo} type="video/mp4" />
        </motion.video>
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="hero-text">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Building the Future of
            <br />
            Software Engineering
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We craft innovative solutions that transform businesses through 
            cutting-edge technology and exceptional engineering expertise.
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="hero-button primary">
              <span>Our Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="hero-button secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4v.01M12 20v.01M20 12h.01M4 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Learn More</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* =====================================================
   AI in Canada Section
   – Only the content inside fades in; the background image and overlay remain static.
===================================================== */
const AICanadaSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="ai" className="ai-canada-section">
      <div className={`ai-canada-background ${!isVideoLoaded ? 'loading' : ''}`}>
        <motion.video
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={PioneerVideo} type="video/mp4" />
        </motion.video>
      </div>
      
      <motion.div 
        className="ai-canada-content"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Pioneering AI Innovation</h2>
        <p>
          Transforming the future through advanced artificial intelligence solutions. 
          We're building tomorrow's technology today.
        </p>
        <button className="ai-button">
          Explore AI Solutions
          <span className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </motion.div>
    </section>
  );
};

/* =====================================================
   Business Highlights Section
   – Wrap only the textual content with fade.
===================================================== */
const BusinessHighlights = () => (
  <section id="highlights" className="business-highlights">
    <div className="highlights-grid">
      <div className="highlight-card">
        <img 
          src={LocateUsImg}
          alt="Our Offices" 
          className="highlight-image"
        />
        <div className="highlight-content">
          <h3>Locate Us</h3>
          <p>Discover our global office locations and where we make innovation happen</p>
        </div>
      </div>

      <div className="highlight-card">
        <img 
          src={InovationImg}
          alt="Healthcare Innovation" 
          className="highlight-image"
        />
        <div className="highlight-content">
          <h3>Healthcare Innovation</h3>
          <p>TELUS Health revolutionizes virtual pharmacy with AI-powered solutions</p>
        </div>
      </div>

      <div className="highlight-card">
        <img 
          src={ExcellenceImg}
          alt="Media Solutions" 
          className="highlight-image"
        />
        <div className="highlight-content">
          <h3>Media Excellence</h3>
          <p>Bell Media achieves 70% faster deployment with our cutting-edge solutions</p>
        </div>
      </div>

      <div className="highlight-card">
        <img 
          src={SuccessStoriesImg}
          alt="Case Studies" 
          className="highlight-image"
        />
        <div className="highlight-content">
          <h3>Success Stories</h3>
          <p>Explore how we've transformed businesses across industries</p>
        </div>
      </div>
    </div>
  </section>
);

/* =====================================================
   Engineering Excellence Section
   – Only fade in text elements.
===================================================== */
const EngineeringExcellence = () => (
  <section id="engineering" className="engineering-excellence">
    <div className="engineering-content">
      <div className="engineering-header">
        <FadeInSection>
          <h2>Engineering Excellence</h2>
          <p>
            Pioneering the future of software development with cutting-edge technologies 
            and industry-leading expertise. Our engineering teams deliver solutions that 
            set new standards in the digital world.
          </p>
        </FadeInSection>
      </div>

      <div className="engineering-grid">
        <FadeInSection>
          <div className="engineering-card">
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-9M20 11h-9M20 15h-9M3 7h2M3 11h2M3 15h2"/>
              </svg>
            </div>
            <h3>SAP Ecosystem 2024</h3>
            <p>Leading the digital transformation with comprehensive SAP solutions and innovations.</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="engineering-card">
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Salesforce Ecosystem</h3>
            <p>Transforming customer experiences with powerful Salesforce implementations.</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="engineering-card">
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Workday Solutions</h3>
            <p>Optimizing enterprise operations with next-generation Workday implementations.</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Enterprise Clients</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="engineering-card">
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
            </div>
            <h3>Google Cloud</h3>
            <p>Building scalable cloud solutions with cutting-edge Google Cloud technologies.</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-number">1000+</span>  {/* Fixed the malformed closing tag */}
                <span className="stat-label">Deployments</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

/* =====================================================
   Career Section
   – Only fade in the heading and button.
===================================================== */
const CareerSection = () => (
  <section id="career" className="career-section">
    <div className="career-background">
      <div className="career-overlay"></div>
      <motion.div 
        className="career-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FadeInSection>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Join Our Engineering Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="career-description"
          >
            Be part of a team that's shaping the future of technology. 
            Work with cutting-edge tools and brilliant minds.
          </motion.p>
          <motion.div 
            className="career-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="career-button primary">
              <span>View Open Positions</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="career-button secondary">
              <span>Learn About Culture</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </button>
          </motion.div>
        </FadeInSection>
      </motion.div>
    </div>

    <div className="career-stats">
      <div className="stat-item">
        <span className="stat-number">500+</span>
        <span className="stat-label">Engineers Worldwide</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">30+</span>
        <span className="stat-label">Countries</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">4.8</span>
        <span className="stat-label">Employee Rating</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">92%</span>
        <span className="stat-label">Retention Rate</span>
      </div>
    </div>
  </section>
);

// Add error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;    
  }
}

/* =====================================================
   Main HeroSection Component - Wrapped with ErrorBoundary
===================================================== */
const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ParallaxProvider>
        <div>
          <ScrollProgressBar />
          <Hero />
          <GetAnswersForm />
          <AICanadaSection />
          <BusinessHighlights />
          <EngineeringExcellence />
          <CareerSection />
          <BackToTopButton />
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <h2>Contact Us</h2>
            <p>Please fill out the form or call us at (123) 456-7890.</p>
          </Modal>
        </div>
      </ParallaxProvider>
    </ErrorBoundary>
  );
};

export default HeroSection;
