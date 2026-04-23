import pool from "../../../db/db.js";

const getWaitingList = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM waiting_students ORDER BY created_at ASC"
    );

    return res.status(200).json({
      success: true,
      waitingStudents: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getWaitingList;