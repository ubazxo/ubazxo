import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import ContactPage from "./ContactPage";
import Press from './Press';
import AboutPage from "./AboutPage";
import ServicePage from "./ServicePage";
import SignIn from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard"; // Import Dashboard Page
import Blog from "./Blog";        // Add this import
import Careers from "./Careers";  // Add this import
import "./css/global.css"; // Import global CSS here
import ScrollToTop from "./components/ScrollToTop";  // Add this import

// Simulated authentication state (replace with actual auth logic)
const isAuthenticated = () => !!localStorage.getItem("token"); // Check if a token exists

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/press" element={<Press />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/blog" element={<Blog />} />        {/* Add this route */}
            <Route path="/careers" element={<Careers />} />  {/* Add this route */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
