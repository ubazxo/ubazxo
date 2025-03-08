// AnimatedInput.jsx
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedInput = ({ error, ...rest }) => {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        border: error ? "1px solid #ff4d4f" : "1px solid transparent",
        padding: "0.8rem",
        borderRadius: "4px",
        width: "100%",
        margin: "0.5rem 0",
      }}
      {...rest}
    />
  );
};

AnimatedInput.propTypes = {
  error: PropTypes.bool,
};

export default AnimatedInput;
