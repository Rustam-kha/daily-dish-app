
import React from "react";
import { IoMdClose } from "react-icons/io";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../config";
axios.defaults.withCredentials = true;

const Cart = ({ showCart, setShowCart }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );



  const checkout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/checkout`, {
        withCredentials: true,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              className="fixed right-0 top-0 w-full sm:w-96 h-full bg-white z-50 
                shadow-2xl flex flex-col"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FiShoppingBag className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">My Order</h2>
                      <p className="text-green-100 text-sm">
                        {cartItems.length} item
                        {cartItems.length !== 1 ? "s" : ""} in cart
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 
                      flex items-center justify-center transition-colors "
                  >
                    <IoMdClose className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((food) => <ItemCard key={food._id} {...food} />)
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                      <FiPackage className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-xs">
                      Add delicious items from our menu to get started
                    </p>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        navigate("/");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                        text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 
                        transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Browse Menu
                    </button>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                  
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>Rs. {totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={checkout}
                    disabled={cartItems.length === 0}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-white
                      bg-gradient-to-r from-green-600 to-green-700
                      hover:from-green-700 hover:to-green-800
                      shadow-lg hover:shadow-xl
                      transition-all duration-300 transform hover:scale-[1.02]
                      disabled:opacity-50 "
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    {totalPrice > 500 ? (
                      <span className="text-green-600 font-medium">
                        🎉 You've unlocked FREE delivery!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <span className="font-medium">
                          Rs. {(501 - totalPrice).toFixed(2)}
                        </span>{" "}
                        more for FREE delivery
                      </span>
                    )}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!showCart && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCart(true)}
          className={`fixed bottom-6 right-6 z-30 w-16 h-16 rounded-full
            flex items-center justify-center shadow-2xl transition-all duration-300 z-50
            ${
              totalQty > 0
                ? "bg-gradient-to-r from-green-600 to-green-700"
                : "bg-gradient-to-r from-gray-700 to-gray-800"
            }`}
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {totalQty > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600
                  text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
              >
                {totalQty > 9 ? "9+" : totalQty}
              </motion.span>
            )}
          </div>
        </motion.button>
      )}
    </>
  );
};

export default Cart;
