import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { getDashboardStats } from "../../../controllers/admin/dashboard/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/stats", authMiddleware, getDashboardStats);

export default dashboardRoutes;