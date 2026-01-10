
import React, { useState, useEffect } from "react";
import FoodData from "../data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";
import { FiFilter, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  useEffect(() => {
    const uniqueCategories = [...new Set(FoodData.map((food) => food.category))];
    setCategories(["All", ...uniqueCategories]);
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
       
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Discover Delicious <span className="text-green-600">Foods</span>
            </h2>
            <p className="text-gray-600">
              Browse our menu by category to find your favorite dishes
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiFilter className="text-lg" />
            <span className="text-sm font-medium">Filter by Category</span>
          </div>
        </div>

   
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => dispatch(setCategory(category))}
              className={`group relative p-4 md:p-5 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl shadow-green-200"
                  : "bg-white text-gray-700 hover:bg-green-50 hover:shadow-lg border border-gray-100 cursor-pointer"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 ${
                selectedCategory === category
                  ? "bg-white/20"
                  : "bg-green-100"
              }`}>
                <span className={`text-lg md:text-xl font-bold ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-green-600"
                }`}>
                  {category.charAt(0)}
                </span>
              </div>

         
              <span className="font-semibold text-sm md:text-base text-center">
                {category}
              </span>

              {selectedCategory === category && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                >
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </motion.div>
              )}

              {selectedCategory !== category && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FiChevronRight className="text-green-600" />
                </div>
              )}
            </motion.button>
          ))}
        </div>

       
        {selectedCategory && selectedCategory !== "All" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">
                  {selectedCategory.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Currently viewing: <span className="text-green-600">{selectedCategory}</span>
                </h3>
                <p className="text-sm text-gray-600">
                  {FoodData.filter(food => food.category === selectedCategory).length} items available
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
