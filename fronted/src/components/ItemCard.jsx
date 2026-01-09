import React from "react";
import {
  Plus,
  Minus,
  Trash2,
  Package
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";
import { motion } from "framer-motion";
import { API_URL } from "../config";
function ItemCard({ name, image, price, quantity, _id, category }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const refreshCart = async () => {
    const cartData = await getCart(user);
    dispatch(setCart(cartData.cartItems));
  };

  const removeFromCart = async () => {
    if (!user?._id) return;
    await axios.delete(`${API_URL}/api/remove-from-cart/${user._id}/${_id}`, {
      withCredentials: true,
    });
    toast.success("Item removed");
    refreshCart();
  };

  const incrementQuantity = async () => {
    await axios.put(
      `http://localhost:5000/api/increment-quantity/${_id}`,
      {},
      { withCredentials: true }
    );
    refreshCart();
  };

  const decrementQuantity = async () => {
    if (quantity <= 1) return;
    await axios.put(
      `http://localhost:5000/api/decrement-quantity/${_id}`,
      {},
      { withCredentials: true }
    );
    refreshCart();
  };

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case "veg":
        return "bg-green-100 text-green-800";
      case "non-veg":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="relative w-full bg-white rounded-xl p-4
                 border border-gray-100 shadow-sm
                 hover:shadow-md transition"
    >
      <div className="flex gap-4 w-full min-w-0">
        {/* IMAGE */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {category && (
            <span
              className={`absolute -top-2 -left-2 px-2 py-0.5
                          text-xs font-semibold rounded-md
                          ${getCategoryColor(category)}`}
            >
              {category}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {/* TOP ROW */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>

              <p className="text-sm text-gray-500">
                Rs. {price} × {quantity}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={removeFromCart}
              className="p-2 rounded-lg
                         text-gray-400 hover:text-red-500
                         hover:bg-red-50"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>

          {/* CONTROLS */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {/* QUANTITY */}
            <div className="flex items-center gap-2">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg
                           bg-gray-100 hover:bg-gray-200
                           disabled:opacity-40
                           flex items-center justify-center"
              >
                <Minus size={16} />
              </button>

              <span className="w-10 text-center font-semibold">{quantity}</span>

              <button
                onClick={incrementQuantity}
                className="w-8 h-8 rounded-lg
                           bg-gray-100 hover:bg-gray-200
                           flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* TOTAL */}
            <div className="text-right">
              <p className="text-xs text-gray-500">Item total</p>
              <p className="font-bold text-green-600">
                Rs. {(price * quantity).toFixed(2)}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div
            className="mt-3 pt-3 border-t border-gray-100
                          flex items-center gap-4 text-xs text-gray-500"
          >
            <div className="flex items-center gap-1">
              <Package size={14} />
              In stock
            </div>
            <span className="text-green-600 font-medium">Free delivery</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ItemCard;
