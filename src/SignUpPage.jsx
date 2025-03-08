import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FadeInSection from "./components/FadeInSection";
import "./css/SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const signUpAPI = useCallback(async (data) => {
    try {
      const response = await fetch("http://localhost:8081/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message || "Sign Up failed");
      }
      return parsedResponse;
    } catch (error) {
      console.error("Sign Up API error:", error);
      return { success: false, message: error.message };
    }
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await signUpAPI(data);
    setLoading(false);
    if (response && response.id) {
      alert("Sign Up Successful! Please log in.");
      navigate("/signin");
    } else {
      alert(response.message || "Sign Up failed");
    }
  };

  return (
    <div className="signup-page">
      <section className="signup-container modern-section">
        <div className="background-animation"></div>
        <div className="overlay"></div>
        <div className="signup-content">
          <FadeInSection>
            <h1>Create an Account</h1>
          </FadeInSection>
          <FadeInSection>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              <motion.input
                type="text"
                name="firstname"
                placeholder="First Name*"
                {...register("firstname", { required: "First Name is required" })}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={errors.firstname ? "input-error" : ""}
              />
              {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
              <motion.input
                type="text"
                name="lastname"
                placeholder="Last Name*"
                {...register("lastname", { required: "Last Name is required" })}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={errors.lastname ? "input-error" : ""}
              />
              {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
              <motion.input
                type="email"
                name="email"
                placeholder="Email*"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address"
                  }
                })}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <motion.input
                type="password"
                name="password"
                placeholder="Password*"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
              <motion.input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password*"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: value => value === watch("password") || "Passwords do not match"
                })}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up →"}
              </motion.button>
            </form>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
