import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "./contexts/ContextAuth";
import { AlertCircle, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

function SignUp() {
  const { signUp, login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 md:p-20">
      <div className="flex flex-col md:flex-row  gap-10 justify-evenly p-5  min-h-screen md:bg-white md:shadow-lg rounded-2xl md:max-w-230 max-w-120  mx-auto py-auto ">
        <div className="bg-gradient-to-br from-[#0a1e4a] via-[#1e5fb8] to-[#6dd5ed] p-5 rounded-2xl md:px-5 px-5 md:mt-0 -mb-10 md:mb-0 mt-5 my-auto">
          {" "}
          <h1 className="md:mt-110 md:text-3xl text-2xl text-white md:p-0 p-3 md:text-start text-center">
            {" "}
            {isLogin ? "Welcome back! Log in" : "Create your account"}
          </h1>
          <p className="md:text-lg text-sm text-white/80 md:text-start text-center -mt-2 md:mt-0">
            Get access to your personal hub for clarity and productivity
          </p>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="overflow-hidden max-w-md w-full">
            {/* Form */}
            <div className="md:p-8">
              {/* Toggle between Sign Up and Login */}
              <div className="flex p-1 mb-6">
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    !isLogin
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    isLogin
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Log In
                </button>
              </div>
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <form
                onSubmit={isLogin ? handleLogin : handleSignUp}
                className="space-y-4"
              >
                {/* Name field (only for sign up) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder={
                        isLogin
                          ? "Enter your password"
                          : "Create a password (min. 6 characters)"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field (only for sign up) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <NavLink to="/dashboardrouter">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-lg font-semibold hover:from-800-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {loading
                      ? "Please wait..."
                      : isLogin
                        ? "Log In"
                        : "Create Account"}
                  </button>
                </NavLink>
              </form>
              {/* Footer text */}
              <p className="text-center text-sm text-gray-600 mt-6">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
