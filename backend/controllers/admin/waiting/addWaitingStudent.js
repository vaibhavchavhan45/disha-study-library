import pool from "../../../db/db.js";

const addWaitingStudent = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      gender,
      photo_url,
      fee_status,
      start_date,
      expiry_date,
      pending_amount
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    await pool.query(
      `INSERT INTO waiting_students 
      (name, phone, email, gender, photo_url, fee_status, start_date, expiry_date, pending_amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, phone, email || null, gender, photo_url || null, fee_status || "UNPAID", start_date || null, expiry_date || null, pending_amount || 0]
    );

    return res.status(201).json({
      success: true,
      message: "Student added to waiting list",
    });
  } catch (error) {
    next(error);
  }
};

export default addWaitingStudent;