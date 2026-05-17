import pool from "../../../db/db.js";
import { getGenderForSeat } from "../../../Data/seatGender.js";

const assignWaitingSeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { seatId, fee_status } = req.body;

    if (!seatId) {
      return res.status(400).json({
        success: false,
        message: "Seat is required",
      });
    }

    const waitingResult = await pool.query(
      "SELECT * FROM waiting_students WHERE id = $1",
      [id]
    );

    if (waitingResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Waiting student not found" });
    }

    const waitingStudent = waitingResult.rows[0];

    const seatResult = await pool.query(
      "SELECT * FROM seats WHERE id = $1",
      [seatId]
    );

    if (seatResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Seat not found" });
    }

    const seat = seatResult.rows[0];

    if (seat.status !== "EMPTY") {
      return res.status(400).json({ success: false, message: "Only empty seats can be assigned" });
    }

    const gender = getGenderForSeat(seat.seat_number);
    if (!gender) {
      return res.status(400).json({ success: false, message: "Invalid seat number." });
    }

    if (gender !== waitingStudent.gender) {
      return res.status(400).json({
        success: false,
        message: `This seat is for ${gender}. Student is registered as ${waitingStudent.gender}.`,
      });
    }

    await pool.query(
      `UPDATE seats
       SET name = $1,
           phone = $2,
           email = $3,
           gender = $4,
           photo_url = $5,
           status = 'OCCUPIED',
           fee_status = $6,
           start_date = $7,
           expiry_date = $8
       WHERE id = $9`,
      [
        waitingStudent.name,
        waitingStudent.phone,
        waitingStudent.email,
        gender,
        waitingStudent.photo_url || null,
        fee_status || waitingStudent.fee_status || "UNPAID",
        waitingStudent.start_date || null,
        waitingStudent.expiry_date || null,
        seatId,
      ]
    );

    await pool.query(
      "DELETE FROM waiting_students WHERE id = $1",
      [id]
    );

    return res.status(200).json({ success: true, message: "Waiting student assigned to seat successfully" });
  } catch (error) {
    next(error);
  }
};

export default assignWaitingSeat;