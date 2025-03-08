import React, { useState, useEffect, useCallback, useRef } from "react";
import "./css/AboutPage.css";
import AboutUsVideo from './assets/vids/AboutUs.mp4';
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

// Team member images
import FaizanImg from './assets/imgs/Faizan.jpg';
import AliImg from './assets/imgs/Ali.jpg';
//import UbaidImg from './assets/imgs/team/Ubaid.jpg';
import JayeshImg from './assets/imgs/Jayesh.jpg';
import RiddhiImg from './assets/imgs/Ridhi.jpg';
import SameedImg from './assets/imgs/Syed.jpg';

/* =====================================================
   FadeInSection Component
   – Uses IntersectionObserver to toggle "is-visible" on its children.
   – Wrap only the text (or inline content) that should fade.
===================================================== */
const FadeInSection = (props) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const element = domRef.current; // capture the element now
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

const teamMembers = [
  {
    name: "Faizan Ahmad",
    role: "Business Lead & Contract Specialist",
    image: FaizanImg
  },
  {
    name: "Ali",
    role: "IT Consultant & Business Strategist",
    image: AliImg
  },
  {
    name: "Ubaid Bhatti",
    role: "Jr. Software Developer",
    //image: UbaidImg
  },
  {
    name: "Jayesh Thakor",
    role: "Senior Java Developer",
    image: JayeshImg
  },
  {
    name: "Riddhi Patel",
    role: "Android & Backend Lead",
    image: RiddhiImg
  },
  {
    name: "Syed Sameed Ashraf",
    role: "Senior Full Stack Developer",
    image: SameedImg
  }
];

const services = [
  {
    title: "Software Development",
    image: SoftwareDevImg
  },
  {
    title: "Cloud Solutions",
    image: CloudSolutionsImg
  },
  {
    title: "AI & Machine Learning",
    image: AiMachineLearningImg
  },
  {
    title: "Cybersecurity",
    image: CybersecurityImg
  },
  {
    title: "DevOps & Automation",
    image: DevOpsImg
  },
  {
    title: "Mobile App Development",
    image: MobileAppImg
  },
  {
    title: "UI/UX Design",
    image: UiUxImg
  },
  {
    title: "Blockchain Solutions",
    image: BlockchainImg
  },
  {
    title: "Data Analytics",
    image: DataAnalyticsImg
  },
  {
    title: "IoT Solutions",
    image: IoTImg
  },
  {
    title: "IT Consulting",
    image: ConsultingImg
  },
  {
    title: "Quality Assurance",
    image: QaImg
  }
];

/* =====================================================
   AboutPage Component
   – Uses an animated gradient background and overlay,
   – Text content is wrapped in FadeInSection for smooth fade in/out.
===================================================== */
const AboutPage = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <div className="about-page">
      <ScrollProgressBar />

      <section className="about-hero">
        <div className={`about-hero-video-container ${isVideoLoading ? 'loading' : ''}`}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="about-hero-video"
            onLoadedData={() => setIsVideoLoading(false)}
          >
            <source src={AboutUsVideo} type="video/mp4" />
          </video>
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <FadeInSection>
            <h1 className="about-hero-title">Transforming Ideas Into Reality</h1>
            <p className="about-hero-description">
              We're not just building software, we're crafting the future of digital experiences
              through innovation and excellence.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="about-section">
        <FadeInSection>
          <h2 className="section-title">Our Services</h2>
        </FadeInSection>
        <div className="services-grid">
          {services.map((service, index) => (
            <FadeInSection key={index}>
              <div className="service-card" style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="team-section">
        <FadeInSection>
          <h2 className="section-title">Meet Our Team</h2>
        </FadeInSection>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <FadeInSection key={index}>
              <div className="team-member">
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <BackToTopButton />
    </div>
  );
};

export default AboutPage;
