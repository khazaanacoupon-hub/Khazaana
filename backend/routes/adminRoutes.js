import express from "express";
import {
  signup,
  verifyOTP,
  login,
  verifyLoginOTP,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOTP);
router.post("/reset-password", resetPassword);

// Admin signup
router.post("/signup", signup);

// Verify signup OTP
router.post("/verify-otp", verifyOTP);

// Admin login
router.post("/login", login);

// Verify login OTP
router.post("/verify-login-otp", verifyLoginOTP);

export default router;
