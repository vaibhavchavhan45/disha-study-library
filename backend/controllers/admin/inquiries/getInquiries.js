import pool from "../../../db/db.js";

const getInquiries = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM inquiries ORDER BY created_at DESC"
    );

    return res.status(200).json({
      success: true,
      inquiries: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getInquiries;