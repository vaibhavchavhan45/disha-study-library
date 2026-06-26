import express from "express";
import { submitBooking, getBookings } from "../controllers/booking/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", submitBooking);
router.get("/all", authMiddleware, getBookings);

export default router;