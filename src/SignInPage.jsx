import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FadeInSection from "./components/FadeInSection";
import "./css/SignInPage.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });
  const { register: registerReset, handleSubmit: handleResetSubmit, formState: { errors: resetErrors, isValid: isResetValid } } = useForm({ mode: "onChange" });
  const [forgot, setForgot] = useState(false);

  const loginAPI = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message || "Login failed");
      }
      return parsedResponse;
    } catch (error) {
      console.error("Login API error:", error);
      return { success: false, message: error.message };
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await loginAPI(data);
    setLoading(false);
    if (response.token) {
      localStorage.setItem("token", response.token);
      alert("Login Successful! Redirecting...");
      navigate("/dashboard");
    } else {
      alert(response.message || "Invalid email or password");
    }
  };

  const onResetSubmit = async (data) => {
    alert("Password Reset: Simulated API call");
    setForgot(false);
  };

  return (
    <div className="signin-page">
      <section className="signin-container modern-section">
        <div className="background-animation"></div>
        <div className="overlay"></div>
        <div className="signin-content">
          <FadeInSection>
            <h1>Sign In</h1>
          </FadeInSection>
          <FadeInSection>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <motion.input
                type="email"
                placeholder="Email*"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                whileFocus={{ scale: 1.02 }}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <motion.input
                type="password"
                placeholder="Password*"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                whileFocus={{ scale: 1.02 }}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="submit-button"
                disabled={!isValid || loading}
              >
                {loading ? "Signing In..." : "Sign In →"}
              </motion.button>
            </form>
          </FadeInSection>
          <FadeInSection>
            <div className="auth-links">
              <button className="forgot-link" onClick={() => setForgot(!forgot)}>
                Forgot Password?
              </button>
              <span className="separator">|</span>
              <a href="/signup" className="signup-link">
                Sign Up
              </a>
            </div>
            {forgot && (
              <FadeInSection>
                <form onSubmit={handleResetSubmit(onResetSubmit)} className="reset-form">
                  <motion.input
                    type="email"
                    placeholder="Re-enter your email"
                    {...registerReset("resetEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    whileFocus={{ scale: 1.02 }}
                    className={resetErrors.resetEmail ? "input-error" : ""}
                  />
                  {resetErrors.resetEmail && <span className="error-message">{resetErrors.resetEmail.message}</span>}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="submit-button"
                    disabled={!isResetValid}
                  >
                    Reset Password →
                  </motion.button>
                </form>
              </FadeInSection>
            )}
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
