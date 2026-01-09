import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../config";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.put(`${API_URL}/api/reset-password`, { email });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50/50">
      <div className="w-full max-w-md">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email to receive a password reset OTP
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 bg-gray-50/50
                    focus:border-green-500 focus:ring-2 focus:ring-green-100 
                    transition-all duration-200"
                  placeholder="you@example.com"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll send a 4-digit verification code to this email
              </p>
            </div>

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
                  Sending OTP...
                </span>
              ) : (
                "Send Verification Code"
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                border-2 border-gray-200 text-gray-700 hover:border-green-500 hover:bg-green-50 
                transition-all duration-200 font-medium"
            >
              <span>←</span>
              Back to Login
            </Link>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              <span className="font-semibold">Note:</span> Check your spam
              folder if you don't receive the email within a few minutes
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;