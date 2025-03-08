import React, { useState, useEffect, useCallback } from 'react';
import './BackToTop.css';

const BackToTop = () => {
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

export default BackToTop;
