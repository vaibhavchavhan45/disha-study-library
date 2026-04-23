import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";

const changePassword = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { currentPassword, newPassword } = req.body;

    const adminResult = await pool.query(
      "SELECT * FROM admins WHERE id = $1",
      [adminId]
    );

    if (adminResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const admin = adminResult.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE admins SET password_hash = $1 WHERE id = $2`,
      [hashedPassword, adminId]
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default changePassword;