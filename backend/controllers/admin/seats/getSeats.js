import pool from "../../../db/db.js";


const getSeats = async (req, res, next) => {
  try {
    const { gender } = req.query;

    let query = "SELECT * FROM seats";
    let values = [];

    if (gender) {
      query += " WHERE gender = $1";
      values.push(gender);
    }

    query += " ORDER BY seat_number ASC";

    const result = await pool.query(query, values);

    // Auto-update PAID, UNPAID if expiry passed
    const now = new Date();
    const updatePromises = result.rows
      .filter(seat =>
        seat.fee_status?.toUpperCase() === "PAID" &&
        seat.expiry_date &&
        new Date(seat.expiry_date) < now
      )
      .map(seat =>
        pool.query(
          "UPDATE seats SET fee_status = 'UNPAID' WHERE id = $1",
          [seat.id]
        ).then(() => { seat.fee_status = "UNPAID"; })
      );

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      seats: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getSeats;