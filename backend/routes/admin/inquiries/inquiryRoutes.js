import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { getInquiries, moveInquiryToWaiting } from "../../../controllers/admin/inquiries/inquiryController.js";

const inquiryRoutes = express.Router();

inquiryRoutes.get("/", authMiddleware, getInquiries);
inquiryRoutes.put("/:id/move", authMiddleware, moveInquiryToWaiting);

export default inquiryRoutes;