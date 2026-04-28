import { Router } from "express";
import {
  registerAccount,
  loginAccount,
  googleLogin,
  logout,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Google Login route
router.route("/google").post(googleLogin);

// Register route
router.route("/register").post(registerAccount);

// Login route
router.route("/login").post(loginAccount);

// Logout route (protected)
router.route("/logout").post(protect, logout);

export default router;