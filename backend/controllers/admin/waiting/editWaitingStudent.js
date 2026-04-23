import pool from "../../../db/db.js";

const editWaitingStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, email, gender, fee_status, photo_url, start_date, expiry_date } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and email are required.",
      });
    }

    const result = await pool.query(
      "SELECT * FROM waiting_students WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Waiting student not found.",
      });
    }

    await pool.query(
      `UPDATE waiting_students
       SET name        = $1,
           phone       = $2,
           email       = $3,
           gender      = $4,
           fee_status  = $5,
           photo_url   = $6,
           start_date  = $7,
           expiry_date = $8
       WHERE id = $9`,
      [name, phone, email, gender, fee_status, photo_url || null, start_date || null, expiry_date || null, id]
    );

    return res.status(200).json({
      success: true,
      message: "Waiting student updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default editWaitingStudent;