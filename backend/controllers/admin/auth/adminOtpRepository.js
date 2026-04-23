import pool from "../../../db/db.js";

// Save admin OTP — clears previous OTP for same email + purpose
export const saveAdminOTPRecord = async (email, otp, purpose) => {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await pool.query(
    "DELETE FROM admin_otp_store WHERE email = $1 AND purpose = $2",
    [email, purpose]
  );

  await pool.query(
    `INSERT INTO admin_otp_store (email, otp, purpose, expires_at, attempts)
     VALUES ($1, $2, $3, $4, 0)`,
    [email, otp, purpose, expiresAt]
  );
};

// Get latest OTP record for email + purpose
export const getAdminOTPRecord = async (email, purpose) => {
  const res = await pool.query(
    `SELECT * FROM admin_otp_store
     WHERE email = $1 AND purpose = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [email, purpose]
  );

  return res.rows[0];
};

// Increment wrong attempts count
export const updateAdminOTPAttempts = async (email, purpose, attempts) => {
  await pool.query(
    "UPDATE admin_otp_store SET attempts = $1 WHERE email = $2 AND purpose = $3",
    [attempts, email, purpose]
  );
};

// Delete OTP record after success or max attempts exceeded
export const deleteAdminOTP = async (email, purpose) => {
  await pool.query(
    "DELETE FROM admin_otp_store WHERE email = $1 AND purpose = $2",
    [email, purpose]
  );
};