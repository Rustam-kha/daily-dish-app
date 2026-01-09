import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="w-40 h-40 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <FiAlertTriangle className="text-6xl text-red-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-20 h-20 border-4 border-red-200 rounded-full animate-ping opacity-20"></div>
        </motion.div>

        {/* Error Content */}
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 gap-2"
            >
              <FiHome />
              Back to Home
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-300 shadow hover:bg-gray-50 transition-all duration-300 gap-2"
            >
              <FiRefreshCw />
              Refresh Page
            </button>
          </motion.div>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            to="/contact"
            className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
          >
            Contact our support team
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            Try searching or check our{' '}
            <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
              homepage
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
      
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 text-gray-400"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Error;