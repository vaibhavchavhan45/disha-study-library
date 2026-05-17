import express from "express";
import {
  loginAdmin,
  verifyAdminOTP,
  forgotPassword,
  forgotResetPassword,
  changePassword,
  getProfile,
  updateProfile,
} from "../../../controllers/admin/auth/authController.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import reportSuspicious from "../../../controllers/admin/auth/reportSuspicious.js";

const authRoutes = express.Router();

// Public Routes
authRoutes.post("/login", loginAdmin);
authRoutes.post("/verify-otp", verifyAdminOTP);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", forgotResetPassword);
authRoutes.post("/report-suspicious", reportSuspicious);

// Protected Routes (jwt)
authRoutes.post("/change-password", authMiddleware, changePassword);
authRoutes.get("/profile", authMiddleware, getProfile);
authRoutes.put("/profile", authMiddleware, updateProfile);

export default authRoutes;