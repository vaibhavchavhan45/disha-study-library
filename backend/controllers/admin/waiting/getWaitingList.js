import pool from "../../../db/db.js";

const getWaitingList = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM waiting_students ORDER BY created_at ASC"
    );

    const now = new Date();
    const updatePromises = result.rows
      .filter(student =>
        student.fee_status?.toUpperCase() === "PAID" &&
        student.expiry_date &&
        new Date(student.expiry_date) < now
      )
      .map(student =>
        pool.query(
          "UPDATE waiting_students SET fee_status = 'UNPAID' WHERE id = $1",
          [student.id]
        ).then(() => { student.fee_status = "UNPAID"; })
      );

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      waitingStudents: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default getWaitingList;