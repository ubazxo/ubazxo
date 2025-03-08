import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Navbar.module.css";
import logoImage from "./assets/imgs/Logo.png"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Reduce scroll threshold to match Netflix behavior
      setIsScrolled(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants for the mobile menu animation
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={logoImage} alt="CoreLoom Logo" className={styles.logoImage} />
        </NavLink>
      </div>
      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active} ${styles.signinButton}` : `${styles.navLink} ${styles.signinButton}`
          }
        >
          Login
        </NavLink>
      </div>
      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <motion.span
          className={styles.bar}
          animate={menuOpen ? { rotate: 45, y: 8 } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={styles.bar}
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={styles.bar}
          animate={menuOpen ? { rotate: -45, y: -8 } : {}}
          transition={{ duration: 0.3 }}
        />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              SignIn
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
