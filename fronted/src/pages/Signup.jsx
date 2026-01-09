import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../config";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/signup`, {
        name,
        email,
        password,
      });
      const data = res.data;
      if (res.status === 201) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50/50">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">DD</span>
            </div>
            <span className="text-3xl font-bold text-green-800">DailyDish</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Join Our Community
          </h1>
          <p className="text-gray-600 mt-2">
            Start your delicious journey with us
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Form */}
            <motion.div
              className="md:w-2/3 p-8 md:p-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSignup} noValidate className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-4 py-3 pl-12 rounded-xl border-2 bg-gray-50/50
                        ${
                          errors.name
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        } transition-all duration-200`}
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: "" });
                      }}
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      👤
                    </span>
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className={`w-full px-4 py-3 pl-12 rounded-xl border-2 bg-gray-50/50
                        ${
                          errors.email
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        } transition-all duration-200`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                      }}
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📧
                    </span>
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className={`w-full px-4 py-3 pl-12 rounded-xl border-2 bg-gray-50/50
                        ${
                          errors.password
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        } transition-all duration-200`}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                      }}
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔒
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.password}
                    </p>
                  )}

                  {/* Password Requirements */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      {[
                        {
                          text: "At least 6 characters",
                          met: password.length >= 6,
                        },
                        {
                          text: "Contains letters",
                          met: /[a-zA-Z]/.test(password),
                        },
                        { text: "Contains numbers", met: /\d/.test(password) },
                      ].map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span
                            className={`text-sm ${
                              req.met ? "text-green-600" : "text-gray-400"
                            }`}
                          >
                            {req.met ? "✓" : "○"}
                          </span>
                          <span
                            className={`text-xs ${
                              req.met ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button className="text-green-600 hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-green-600 hover:underline">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all duration-200
                    ${
                      isLoading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-200"
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-8">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-green-600 hover:text-green-700 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>

            {/* Right side - Benefits */}
            <motion.div
              className="hidden md:block md:w-1/3 bg-gradient-to-br from-green-600 to-green-800 p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-white h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-6">Benefits of Joining</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Welcome Bonus",
                      desc: "Get 20% off your first order",
                      icon: "🎁",
                    },
                    {
                      title: "Priority Support",
                      desc: "24/7 customer care",
                      icon: "🌟",
                    },
                    {
                      title: "Flexible Plans",
                      desc: "Pause or cancel anytime",
                      icon: "⚡",
                    },
                    {
                      title: "Exclusive Access",
                      desc: "Early access to new dishes",
                      icon: "🔑",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{benefit.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-yellow-300">
                          {benefit.title}
                        </h3>
                        <p className="text-green-100 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white/10 rounded-xl p-4">
                  <p className="text-green-100 text-sm italic">
                    "Joining DailyDish was the best decision for my busy
                    lifestyle!"
                  </p>
                  <p className="text-yellow-300 text-sm mt-2 font-semibold">
                    - Michael T.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;