import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const defaultVariants = {
  hover: { scale: 1.05, backgroundColor: "#4338ca" },
  tap: { scale: 0.95 }
};

const AnimatedButton = ({
  children,
  onClick,
  style,
  disabled,
  variants,
  type,
  ...rest
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? (variants?.hover || defaultVariants.hover) : {}}
      whileTap={!disabled ? (variants?.tap || defaultVariants.tap) : {}}
      transition={{ duration: 0.2 }}
      style={{
        padding: "12px 24px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4f46e5",
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        ...style
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  variants: PropTypes.shape({
    hover: PropTypes.object,
    tap: PropTypes.object,
  }),
  type: PropTypes.string,
};

AnimatedButton.defaultProps = {
  onClick: () => {},
  style: {},
  disabled: false,
  type: "button",
};

export default AnimatedButton;
