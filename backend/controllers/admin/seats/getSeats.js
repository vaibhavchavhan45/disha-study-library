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

    return res.status(200).json({
      success: true,
      seats: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getSeats;