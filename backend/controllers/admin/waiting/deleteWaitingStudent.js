import pool from "../../../db/db.js";

const deleteWaitingStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM waiting_students WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Waiting student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student removed from waiting list",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteWaitingStudent;