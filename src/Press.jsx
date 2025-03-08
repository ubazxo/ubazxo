import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from './components/FadeInSection';
import BackToTop from './components/BackToTop';
import './css/Press.css';

const Press = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const pressReleases = [
    {
      title: "CoreLoom's AI Platform Transforms Enterprise Solutions",
      date: "June 20, 2023",
      source: "TechNews",
      category: "Innovation",
      excerpt: "Setting new industry standards with breakthrough AI technology...",
      image: "https://source.unsplash.com/random/800x600?tech",
      featured: true,
      link: "#"
    },
    {
      title: "Strategic Partnership with Fortune 500 Companies",
      date: "June 15, 2023",
      source: "Business Insider",
      category: "Partnerships",
      excerpt: "Expanding global reach through strategic collaborations...",
      image: "https://source.unsplash.com/random/800x600?partnership",
      link: "#"
    },
    {
      title: "Global Expansion Marks New Chapter",
      date: "June 1, 2023",
      source: "Business Weekly",
      category: "Company",
      excerpt: "Strategic expansion into key markets demonstrates strong growth...",
      image: "https://source.unsplash.com/random/800x600?business",
      link: "#"
    },
    {
      title: "Record-Breaking Financial Performance",
      date: "May 15, 2023",
      source: "Investor Relations",
      category: "Finance",
      excerpt: "Exceptional Q2 results exceed market expectations...",
      image: "https://source.unsplash.com/random/800x600?finance",
      link: "#"
    }
  ];

  const mediaKit = [
    { title: "Brand Guidelines", size: "2.3 MB", format: "PDF" },
    { title: "Press Kit", size: "5.1 MB", format: "ZIP" },
    { title: "Company Logos", size: "1.8 MB", format: "AI" },
    { title: "Image Library", size: "8.4 MB", format: "ZIP" }
  ];

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/yourcompany' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/yourcompany' },
    { name: 'Instagram', url: 'https://instagram.com/yourcompany' }
  ];

  return (
    <div className="press-wrapper">
      <FadeInSection>
        <div className="press-hero">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Latest News</h1>
            <p>Discover our journey in transforming the future of technology</p>
          </motion.div>
        </div>
      </FadeInSection>

      <div className="press-container">
        <FadeInSection>
          <motion.div className="featured-story">
            <div className="featured-content">
              <span className="featured-tag">Featured Story</span>
              <h2>{pressReleases[0].title}</h2>
              <p>{pressReleases[0].excerpt}</p>
              <a href={pressReleases[0].link} className="featured-link">Read Full Story</a>
            </div>
            <div className="featured-image" style={{ backgroundImage: `url(${pressReleases[0].image})` }} />
          </motion.div>
        </FadeInSection>

        <FadeInSection>
          <div className="category-filters">
            {['All', 'Innovation', 'Partnerships', 'Company', 'Finance', 'Awards'].map((filter) => (
              <button 
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeInSection>

        <div className="press-grid">
          {pressReleases.map((item, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <motion.article 
                className="press-card"
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
              >
                <div className="card-image" style={{ backgroundImage: `url(${item.image})` }}>
                  <span className="category-label">{item.category}</span>
                </div>
                <div className="card-content">
                  <div className="meta">
                    <span className="date">{item.date}</span>
                    <span className="source">{item.source}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <a href={item.link} className="read-more">
                    Read Article <span>→</span>
                  </a>
                </div>
              </motion.article>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="media-kit-section">
            <h2>Media Resources</h2>
            <p>Download official brand assets and press materials</p>
            <div className="media-kit-grid">
              {mediaKit.map((item, index) => (
                <div key={index} className="media-kit-item">
                  <div className="media-kit-icon">{item.format}</div>
                  <div className="media-kit-info">
                    <h4>{item.title}</h4>
                    <span>{item.size}</span>
                  </div>
                  <button className="download-btn">Download</button>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="press-coverage">
            <h2>Featured In</h2>
            <div className="coverage-logos">
              {/* Add your media coverage logos here */}
              <img src="path-to-logo1" alt="Media 1" />
              <img src="path-to-logo2" alt="Media 2" />
              <img src="path-to-logo3" alt="Media 3" />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="contact-section">
            <h2>Media Contact</h2>
            <p>Get in touch with our media relations team</p>
            <a 
              href="mailto:press@coreloom.com" 
              className="contact-email"
              rel="noopener noreferrer"
            >
              press@coreloom.com
            </a>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </FadeInSection>
        <BackToTop />
      </div>
    </div>
  );
};

export default Press;
