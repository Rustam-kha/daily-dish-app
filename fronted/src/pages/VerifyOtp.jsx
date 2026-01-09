

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:5000/api/verify-otp", {
        otp,
        newPassword: password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-md flex flex-col gap-6 border-t-4 border-green-500"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-center text-sm mb-4">
          Enter the OTP sent to your email and set a new password
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2 transition-all outline-none"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2 transition-all outline-none"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition-all duration-200"
        >
          Reset Password
        </button>

        <p className="text-gray-400 text-xs text-center mt-2">
          Didn't receive an OTP? Check your email or try again.
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
