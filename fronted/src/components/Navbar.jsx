import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { loginUser, setUser, logoutUser } from "../redux/slices/AuthSlice";
import { setCart } from "../redux/slices/CartSlice";
import { getCart } from "../helper";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cart from "./Cart";
import { API_URL } from "../config";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cart);

  const totalQty = cartItems.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/get-user`)
      .then((res) => {
        dispatch(setUser(res.data.user));
        dispatch(loginUser());
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user?._id) {
      getCart(user).then((data) => dispatch(setCart(data.cartItems)));
    }
  }, [user]);

  const logout = async () => {
    await axios.get(`${API_URL}/api/logout`);
    dispatch(logoutUser());
    dispatch(setCart([]));
    toast.success("Logged out");
    navigate("/");
  };

  const formatDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/90 backdrop-blur shadow-md" : "bg-white"}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                DD
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-green-700">DailyDish</h1>
                <p className="text-xs text-gray-500">Fresh Food Delivery</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2.5 rounded-full bg-green-50 hover:bg-green-100 transition-all duration-300 group"
              >
                <div className="relative">
                  <MdShoppingCart
                    size={24}
                    className="text-green-700 transition-transform group-hover:scale-110"
                  />
                  {totalQty > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                      {totalQty > 9 ? "9+" : totalQty}
                    </span>
                  )}
                </div>
                <span className="sr-only">Cart</span>
              </button>

              <div className="hidden lg:flex gap-3">
                {auth ? (
                  <>
                    <span className="text-sm text-green-700 font-medium">
                      Hi, {user?.name?.split(" ")[0]}
                    </span>
                    <button
                      onClick={logout}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <GiHamburgerMenu size={22} />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <span className="hidden md:block text-sm text-gray-600">
              📅 {formatDate()}
            </span>

            <input
              type="search"
              placeholder="Search here..."
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none transition-all"
            />
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <aside className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MdClose size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors font-medium"
              >
                Contact
              </Link>

              <hr className="my-4" />

              {auth ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors font-medium mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      <Cart showCart={showCart} setShowCart={setShowCart} />
    </>
  );
};

export default Navbar;
