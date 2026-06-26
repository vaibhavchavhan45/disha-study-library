import pool from "../../../db/db.js";

const removeSeat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seatResult = await pool.query(
      "SELECT * FROM seats WHERE id = $1",
      [id]
    );

    if (seatResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Seat not found",
      });
    }

    const seat = seatResult.rows[0];

    if (seat.status !== "OCCUPIED" && seat.status !== "RESERVED") {
      return res.status(400).json({
        success: false,
        message: "Only occupied or reserved seats can be removed",
      });
    }

    await pool.query(
      `INSERT INTO ex_students (
        seat_number, gender, name, phone, email, photo_url, fee_status, start_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        seat.seat_number,
        seat.gender,
        seat.name,
        seat.phone,
        seat.email,
        seat.photo_url,
        seat.fee_status,
        seat.start_date || null,
      ]
    );

    await pool.query(
      `UPDATE seats
       SET name = NULL,
           phone = NULL,
           email = NULL,
           photo_url = NULL,
           status = 'EMPTY',
           fee_status = NULL,
           start_date = NULL,
           expiry_date = NULL,
           pending_amount = 0
       WHERE id = $1`,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Seat removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default removeSeat;