import pool from "../../db/db.js";

// Get block record by IP
export const getBlockByIP = async (ip) => {
  const res = await pool.query("SELECT * FROM otp_block WHERE ip = $1", [ip]);
  return res.rows[0];
};

// Insert new block record for first attempt
export const insertBlock = async (ip) => {
  await pool.query(
    "INSERT INTO otp_block (ip, resend_count) VALUES ($1, 1)",
    [ip]
  );
};

// Update resend count and optional block time
export const updateBlock = async (ip, count, blockedUntil = null) => {
  await pool.query(
    "UPDATE otp_block SET resend_count = $1, blocked_until = $2 WHERE ip = $3",
    [count, blockedUntil, ip]
  );
};

// Save OTP to DB (also removes previous OTP for same email)
export const saveOTPRecord = async (email, otp) => {
  const expiresAt = new Date(Date.now() + 60 * 1000);

  await pool.query("DELETE FROM otp_store WHERE email = $1", [email]);

  await pool.query(
    "INSERT INTO otp_store (email, otp, expires_at, attempts) VALUES ($1, $2, $3, 0)",
    [email, otp, expiresAt]
  );
};

// Get latest OTP record for an email
export const getLatestOTP = async (email) => {
  const res = await pool.query(
    `SELECT * 
     FROM otp_store 
     WHERE email = $1 
     ORDER BY created_at DESC 
     LIMIT 1`,
    [email]
  );

  return res.rows[0];
};

// Update OTP wrong attempts count
export const updateOTPAttempts = async (email, attempts) => {
  await pool.query(
    "UPDATE otp_store SET attempts = $1 WHERE email = $2",
    [attempts, email]
  );
};

// Delete OTP after successful verification or too many wrong attempts
export const deleteOTP = async (email) => {
  await pool.query("DELETE FROM otp_store WHERE email = $1", [email]);
};