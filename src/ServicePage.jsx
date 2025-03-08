import React, { useState, useEffect, useCallback } from "react";
import ServicesVideo from './assets/vids/Services.mp4';
import SoftwareDevImg from './assets/imgs/SoftwareDevelopment.jpg';
import CloudSolutionsImg from './assets/imgs/CloudSolutions.jpg';
import AiMachineLearningImg from './assets/imgs/AiMachineLearning.jpg';
import CybersecurityImg from './assets/imgs/CyberSecurity.jpg';
import DevOpsImg from './assets/imgs/DevOps.jpg';
import MobileAppImg from './assets/imgs/MobileApp.jpg';
import UiUxImg from './assets/imgs/UxUi.jpg';
import BlockchainImg from './assets/imgs/BlockchainSolutions.jpg';
import DataAnalyticsImg from './assets/imgs/DataAnalytics.jpg';
import IoTImg from './assets/imgs/IotSolutions.jpg';
import ConsultingImg from './assets/imgs/ITConsulting.jpg';
import QaImg from './assets/imgs/QualityAssurance.jpg';
import "./css/ServicePage.css";
import FadeInSection from './components/FadeInSection';

/* =====================================================
   ScrollProgressBar Component
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

const serviceCategories = [
  'All',
  'Development',
  'Cloud & Infrastructure',
  'AI & Data',
  'Security & DevOps',
  'Design & Mobile',
];

const services = [
  {
    id: 1,
    title: "Software Development",
    description: "Full-stack solutions that drive business growth",
    longDescription: "Custom software solutions built with cutting-edge technologies, from enterprise web applications to mobile apps.",
    image: SoftwareDevImg,
    category: "Development",
    stats: { projects: "200+", satisfaction: "98%" }
  },
  {
    id: 2,
    title: "Cloud Solutions",
    description: "Enterprise-grade cloud infrastructure",
    longDescription: "Scalable cloud solutions leveraging AWS, Azure, and Google Cloud platforms for optimal performance.",
    image: CloudSolutionsImg,
    category: "Cloud & Infrastructure",
    stats: { clients: "150+", uptime: "99.9%" }
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    description: "Intelligent automation solutions",
    longDescription: "Advanced AI solutions with custom ML models, computer vision, and natural language processing.",
    image: AiMachineLearningImg,
    category: "AI & Data",
    stats: { accuracy: "96%", models: "50+" }
  },
  {
    id: 4,
    title: "DevOps & Automation",
    description: "Streamline your development pipeline",
    longDescription: "End-to-end DevOps solutions with CI/CD automation, container orchestration, and infrastructure as code.",
    image: DevOpsImg,
    category: "Security & DevOps",
    stats: { deployments: "1000+", efficiency: "85%" }
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Native and cross-platform solutions",
    longDescription: "Cutting-edge mobile applications for iOS and Android using React Native and Flutter.",
    image: MobileAppImg,
    category: "Design & Mobile",
    stats: { downloads: "1M+", rating: "4.8" }
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "Creating engaging user experiences",
    longDescription: "Human-centered design approach with focus on usability, accessibility, and visual appeal.",
    image: UiUxImg,
    category: "Design & Mobile",
    stats: { satisfaction: "97%", projects: "300+" }
  },
  {
    id: 7,
    title: "Blockchain Solutions",
    description: "Web3 and DApp development",
    longDescription: "Custom blockchain solutions, smart contracts, and decentralized applications development.",
    image: BlockchainImg,
    category: "Development",
    stats: { transactions: "10M+", security: "100%" }
  },
  {
    id: 8,
    title: "Data Analytics",
    description: "Transform data into insights",
    longDescription: "Big data analytics, business intelligence, and predictive modeling solutions.",
    image: DataAnalyticsImg,
    category: "AI & Data",
    stats: { accuracy: "99%", insights: "500+" }
  },
  {
    id: 9,
    title: "IoT Solutions",
    description: "Connected device ecosystems",
    longDescription: "End-to-end IoT solutions from device management to data analytics and visualization.",
    image: IoTImg,
    category: "Cloud & Infrastructure",
    stats: { devices: "10K+", uptime: "99.9%" }
  },
  {
    id: 10,
    title: "Cybersecurity",
    description: "Protect your digital assets",
    longDescription: "Comprehensive security solutions including penetration testing and security audits.",
    image: CybersecurityImg,
    category: "Security & DevOps",
    stats: { protection: "100%", threats: "0" }
  },
  {
    id: 11,
    title: "IT Consulting",
    description: "Strategic technology guidance",
    longDescription: "Expert consultation on digital transformation and technology strategy.",
    image: ConsultingImg,
    category: "Cloud & Infrastructure",
    stats: { roi: "300%", success: "95%" }
  },
  {
    id: 12,
    title: "Quality Assurance",
    description: "Ensure perfect delivery",
    longDescription: "Comprehensive testing and quality management for software applications.",
    image: QaImg,
    category: "Security & DevOps",
    stats: { coverage: "100%", bugs: "0" }
  }
];

/* =====================================================
   ServiceTabs Component
===================================================== */
const ServiceTabs = ({ categories, activeCategory, onSelect }) => (
  <div className="service-categories">
    {categories.map(category => (
      <button
        key={category}
        className={`category-tab ${activeCategory === category ? 'active' : ''}`}
        onClick={() => onSelect(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

/* =====================================================
   ServiceCard Component
===================================================== */
const ServiceCard = ({ service, isSelected, onClick }) => (
  <div 
    className={`service-preview ${isSelected ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className="preview-thumbnail">
      <img src={service.image} alt={service.title} />
    </div>
    <div className="preview-content">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  </div>
);

/* =====================================================
   ServiceDetail Component
===================================================== */
const ServiceDetail = ({ service }) => (
  <div className="service-detail-view">
    <div className="detail-media">
      <img src={service.image} alt={service.title} />
      <div className="detail-overlay" />
    </div>
    <div className="detail-content">
      <h2>{service.title}</h2>
      <p>{service.longDescription}</p>
      <div className="detail-stats">
        {Object.entries(service.stats).map(([key, value]) => (
          <div key={key} className="stat-item">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{key}</span>
          </div>
        ))}
      </div>
      <button className="detail-cta">
        Learn More
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
);

/* =====================================================
   ServicePage Component
===================================================== */
const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  useEffect(() => {
    // Preload the video
    const video = new Image();
    video.src = ServicesVideo;
  }, []);

  return (
    <div className="service-page">
      <ScrollProgressBar />
      
      <FadeInSection>
        <section className="service-hero">
          <div className={`hero-background ${isVideoLoading ? 'loading' : ''}`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
              onLoadedData={() => setIsVideoLoading(false)}
              onError={() => {
                setVideoError(true);
                setIsVideoLoading(false);
              }}
              style={{ objectPosition: 'center center' }}
            >
              <source src={ServicesVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-overlay" />
            {videoError && (
              <div className="video-fallback">
                <img 
                  src="https://source.unsplash.com/random/1920x1080/?technology,digital" 
                  alt="Technology Background"
                  className="fallback-image"
                />
              </div>
            )}
          </div>
          <div className="hero-content">
            <h1>Where Technology Meets Possibility</h1>
            <p>
              Leveraging cutting-edge technology to transform businesses through 
              innovative solutions and exceptional engineering expertise.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="services-showcase">
          <div className="showcase-container">
            <ServiceTabs 
              categories={serviceCategories}
              activeCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            
            <div className="showcase-layout">
              <div className="services-list">
                {filteredServices.map(service => (
                  <FadeInSection key={service.id}>
                    <ServiceCard
                      service={service}
                      isSelected={selectedService.id === service.id}
                      onClick={() => setSelectedService(service)}
                    />
                  </FadeInSection>
                ))}
              </div>
              
              <FadeInSection>
                <ServiceDetail service={selectedService} />
              </FadeInSection>
            </div>
          </div>
        </section>
      </FadeInSection>

      <BackToTopButton />
    </div>
  );
};

export default ServicePage;
