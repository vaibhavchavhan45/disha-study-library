import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { getInquiries } from "../../../controllers/admin/inquiries/inquiryController.js";

const inquiryRoutes = express.Router();

inquiryRoutes.get("/", authMiddleware, getInquiries);

export default inquiryRoutes;