import React from "react";
import axios from "axios";
import { FaStar, FaFire, FaLeaf } from "react-icons/fa";
import { FiShoppingCart, FiClock, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slices/CartSlice";
import { getCart } from "../helper";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../config";
axios.defaults.withCredentials = true;

const FoodCard = ({
  id,
  name,
  price,
  desc,
  rating,
  img,
  category,
  spicyLevel,
  preparationTime,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const addToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/api/add-to-cart/${user._id}`,
        {
          id,
          image: img,
          name,
          price,
          rating,
          quantity: 1,
        }
      );

      toast.success(data.message);
      const cartData = await getCart(user);
      dispatch(setCart(cartData.cartItems));
    } catch {
      toast.error("Failed to add item to cart");
    }
  };

  const badgeStyle = {
    veg: "bg-green-100 text-green-700",
    "non-veg": "bg-red-100 text-red-700",
    spicy: "bg-orange-100 text-orange-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition max-w-sm w-full"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={img}
          alt={name}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          {category && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                badgeStyle[category.toLowerCase()] ||
                "bg-blue-100 text-blue-700"
              }`}
            >
              {category}
            </span>
          )}
          {spicyLevel > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 flex items-center gap-1">
              <FaFire /> {spicyLevel}/5
            </span>
          )}
        </div>

        {/* PRICE */}
        <div className="absolute bottom-3 right-3 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold">
          Rs. {price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{desc}</p>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          {preparationTime && (
            <div className="flex items-center gap-1">
              <FiClock />
              {preparationTime} min
            </div>
          )}
          <div className="flex items-center gap-1 text-green-600">
            <FaLeaf /> Fresh
          </div>
        </div>

        {/* ADD TO CART */}
        <motion.button
          onClick={addToCart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-2.5 rounded-xl bg-green-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition cursor-pointer"
        >
          <FiShoppingCart className="text-lg" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
