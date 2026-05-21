import { Router } from "express";
import { googleLogin, loginUser, logoutUser, registerUser, } from "../controllers/user.controller.js";
import { pro } from "../middleware/auth.middleware.js";

const router = Router();

// Google Login route
router.route("/google").post(googleLogin);

// Register route
router.route("/register").post(registerUser);

// Login route
router.route("/login").post(loginUser);

// Logout route (protected)
router.route("/logout").post(protect, logoutUser);

export default router;