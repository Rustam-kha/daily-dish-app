
import { Router } from "express";
import {
  signup,
  login,
  logout,
  resetPassword,
  verifyOtp,
  getUser,
} from "./controllers/AuthController.js";

import {
  submitContact,
  contactLimiter
} from "./controllers/ContactController.js"; 

import { verifyToken } from "./middlewares/verifyOtp.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  checkout,
  clearCart
} from "./controllers/FeatureController.js";

const router = Router();

// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/reset-password", resetPassword);
router.put("/verify-otp", verifyOtp);
router.get("/get-user", verifyToken, getUser);

// CONTACT ROUTES 
router.post('/contact', contactLimiter, submitContact);

// FEATURES ROUTES
router.post("/add-to-cart/:id", addToCart);
router.get("/get-cart/:id", getCart);
router.delete("/remove-from-cart/:userId/:itemId", removeFromCart);
router.put("/increment-quantity/:id", incrementQuantity)
router.put("/decrement-quantity/:id", decrementQuantity);
router.get("/checkout", verifyToken, checkout)
router.get("/clear-cart", verifyToken, clearCart)

export default router;