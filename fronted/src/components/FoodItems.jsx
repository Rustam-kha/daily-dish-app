import React, { useMemo, useState } from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Filter, Search, Grid, List, X, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { setSearch } from "../redux/slices/SearchSlice";
import { setCategory } from "../redux/slices/CategorySlice";
import { setCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../helper";
import { API_URL } from "../config";
axios.defaults.withCredentials = true;

const FoodItems = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const user = useSelector((state) => state.auth.user);

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  const handleAddToCart = async (food) => {
    if (!user?._id) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/api/add-to-cart/${user._id}`,
        {
          id: food.id,
          image: food.img,
          name: food.name,
          price: food.price,
          rating: food.rating,
          quantity: 1,
        }
      );

      toast.success(data.message);

      const cartData = await getCart(user);
      dispatch(setCart(cartData.cartItems));
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const foods = useMemo(() => {
    let data = FoodData.filter((food) => {
      const matchCategory = category === "All" || food.category === category;
      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });

    if (sortBy === "price") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [category, search, sortBy]);

  const clearSearch = () => dispatch(setSearch(""));
  const resetFilters = () => {
    dispatch(setSearch(""));
    dispatch(setCategory("All"));
    setSortBy("default");
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
    e.target.onerror = null;
  };

  return (
    <>
      <Toaster position="top-center" />

      <section className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Discover <span className="text-green-600">Delicious</span>{" "}
                  Foods
                </h2>
                <p className="text-gray-600 mt-1">
                  {foods.length} {foods.length === 1 ? "item" : "items"}{" "}
                  available
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all w-48"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Rating: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-green-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="text-sm font-medium">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-white text-green-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm font-medium">List</span>
                  </button>
                </div>
              </div>
            </div>

            {search && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
              >
                <Search className="text-gray-400 w-4 h-4" />
                <span className="text-gray-700">
                  Results for{" "}
                  <span className="font-semibold text-green-600">
                    "{search}"
                  </span>
                </span>
                <button
                  onClick={clearSearch}
                  className="ml-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {foods.length ? (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col"
                }
              >
                {viewMode === "grid" ? (
                  foods.map((food, i) => (
                    <motion.div
                      key={food.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <FoodCard {...food} />
                    </motion.div>
                  ))
                ) : (
                  <div className="space-y-4">
                    {foods.map((food, i) => (
                      <motion.div
                        key={food.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.03 }}
                        className="w-full"
                      >
                        <div className="flex gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group">
                          <div className="flex-shrink-0 relative">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              <img
                                src={food.img}
                                alt={food.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={handleImageError}
                                loading="lazy"
                              />

                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                                <Utensils className="w-8 h-8 text-white/30" />
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                    {food.category}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                  {food.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                  {food.desc}
                                </p>
                              </div>

                              <div className="text-right ml-4">
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                  Rs. {food.price}
                                </div>
                                <div className="flex items-center gap-1 justify-end">
                                  <span className="text-yellow-500">★</span>
                                  <span className="font-semibold text-gray-700">
                                    {food.rating}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(food)}
                                className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                              >
                                Add to Cart
                              </motion.button>

                              <div className="text-sm text-gray-500">
                                <span className="text-green-600 font-medium">
                                  🚚 Free delivery
                                </span>{" "}
                                • 30 min
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No items found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {search
                    ? `No results found for "${search}". Try a different search term.`
                    : "Try adjusting your filters or browse all categories."}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Browse All Foods
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default FoodItems;