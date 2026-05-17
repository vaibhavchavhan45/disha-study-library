import pool from "../../../db/db.js";
import { getGenderForSeat } from "../../../Data/seatGender.js";

const assignSeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, email, photo_url, fee_status, start_date, expiry_date, pending_amount } = req.body;

    const seatResult = await pool.query(
      "SELECT * FROM seats WHERE id = $1",
      [id]
    );

    if (seatResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Seat not found" });
    }

    const seat = seatResult.rows[0];

    if (seat.status !== "EMPTY") {
      return res.status(400).json({ success: false, message: "Only empty seats can be assigned" });
    }

    // Gender is derived acc to seat_number
    const gender = getGenderForSeat(seat.seat_number);
    if (!gender) {
      return res.status(400).json({ success: false, message: "Invalid seat number." });
    }

    await pool.query(
      `UPDATE seats
       SET name = $1, phone = $2, email = $3, gender = $4, photo_url = $5,
       status = 'OCCUPIED', fee_status = $6, start_date = $7, expiry_date = $8,
       pending_amount = $9
       WHERE id = $10`,
      [name, phone, email, gender, photo_url, fee_status, start_date, expiry_date, pending_amount || 0, id]
    );

    return res.status(200).json({ success: true, message: "Seat assigned successfully" });
  } catch (error) {
    next(error);
  }
};

export default assignSeat;