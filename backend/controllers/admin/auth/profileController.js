import pool from "../../../db/db.js";

export const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name FROM admins WHERE id = $1",
      [req.admin.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Admin not found" });

    return res.status(200).json({ success: true, admin: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "Name is required" });

    const result = await pool.query(
      `UPDATE admins SET name = $1 WHERE id = $2 RETURNING id, email, name`,
      [name.trim(), req.admin.id]
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      admin: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};