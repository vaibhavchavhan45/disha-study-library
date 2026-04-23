import pool from "../../../db/db.js";

const editSeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, email, fee_status, start_date, expiry_date, photo_url } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and email are required.",
      });
    }

    // Check seat exists and is OCCUPIED or RESERVED
    const seatResult = await pool.query(
      "SELECT * FROM seats WHERE id = $1",
      [id]
    );

    if (seatResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Seat not found.",
      });
    }

    const seat = seatResult.rows[0];

    if (seat.status !== "OCCUPIED" && seat.status !== "RESERVED") {
      return res.status(400).json({
        success: false,
        message: "Only OCCUPIED or RESERVED seats can be edited.",
      });
    }

    // Update student details — status stays unchanged
    await pool.query(
      `UPDATE seats
       SET name        = $1,
           phone       = $2,
           email       = $3,
           fee_status  = $4,
           start_date  = $5,
           expiry_date = $6,
           photo_url   = $7
       WHERE id = $8`,
      [name, phone, email, fee_status, start_date, expiry_date, photo_url, id]
    );

    return res.status(200).json({
      success: true,
      message: "Student details updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default editSeat;