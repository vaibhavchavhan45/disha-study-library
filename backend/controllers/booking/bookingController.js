import { submitBookingService, getBookingsService } from "./bookingService.js";

export const submitBooking = async (req, res) => {
  try {
    const result = await submitBookingService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Submit booking error:", error);

    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to submit booking." });
  }
};


export const getBookings = async (req, res) => {
  try {
    const bookings = await getBookingsService();
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return res.status(500).json({ message: "Failed to fetch bookings." });
  }
};