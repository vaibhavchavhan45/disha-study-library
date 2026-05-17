import pool from "../../../db/db.js";

const moveInquiryToWaiting = async (req, res, next) => {
  try {
    const { id } = req.params;

    const inquiryResult = await pool.query(
      "SELECT * FROM inquiries WHERE id = $1",
      [id]
    );

    if (inquiryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    const inquiry = inquiryResult.rows[0];

    await pool.query(
      `INSERT INTO waiting_students (name, phone, email, gender, photo_url, fee_status)
       VALUES ($1, $2, $3, $4, NULL, 'UNPAID')`,
      [inquiry.name, inquiry.phone, inquiry.email, inquiry.gender]
    );

    await pool.query(
      "DELETE FROM inquiries WHERE id = $1",
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Inquiry moved to waiting list successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default moveInquiryToWaiting;