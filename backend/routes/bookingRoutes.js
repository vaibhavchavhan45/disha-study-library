import express from "express";
import { submitBooking, getBookings } from "../controllers/booking/bookingController.js";

const router = express.Router();

router.post("/submit", submitBooking);
router.get("/all", getBookings);

export default router;