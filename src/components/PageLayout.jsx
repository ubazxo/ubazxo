import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../css/PageLayout.css';

const PageLayout = ({ children, title, subtitle, backgroundImage }) => {
  return (
    <div className="page-container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${backgroundImage})` 
        }}
      >
        <nav className="page-nav">
          <Link to="/" className="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>CoreLoom</span>
          </Link>
        </nav>
        
        <motion.div 
          className="header-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="page-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageLayout;
