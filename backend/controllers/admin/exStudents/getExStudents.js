import pool from "../../../db/db.js";

const getExStudents = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ex_students ORDER BY exit_date DESC"
    );

    return res.status(200).json({
      success: true,
      exStudents: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getExStudents;