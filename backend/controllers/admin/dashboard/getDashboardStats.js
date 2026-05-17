import pool from "../../../db/db.js";

const getDashboardStats = async (req, res, next) => {
  try {
    const totalSeats = await pool.query(
      "SELECT COUNT(*) FROM seats"
    );

    const occupiedSeats = await pool.query(
      "SELECT COUNT(*) FROM seats WHERE status = 'OCCUPIED'"
    );

    const emptySeats = await pool.query(
      "SELECT COUNT(*) FROM seats WHERE status = 'EMPTY'"
    );

    const waitingCount = await pool.query(
      "SELECT COUNT(*) FROM waiting_students"
    );

    const inquiriesCount = await pool.query(
      "SELECT COUNT(*) FROM bookings"
    );

    return res.status(200).json({
      success: true,
      stats: {
        totalSeats: Number(totalSeats.rows[0].count),
        occupiedSeats: Number(occupiedSeats.rows[0].count),
        emptySeats: Number(emptySeats.rows[0].count),
        waitingCount: Number(waitingCount.rows[0].count),
        inquiriesCount: Number(inquiriesCount.rows[0].count),
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getDashboardStats;