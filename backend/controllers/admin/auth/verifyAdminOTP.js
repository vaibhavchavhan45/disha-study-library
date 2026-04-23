import pool from "../../../db/db.js";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";
import {
  getAdminOTPRecord,
  updateAdminOTPAttempts,
  deleteAdminOTP,
} from "./adminOtpRepository.js";

const MAX_ATTEMPTS = 3;

const verifyAdminOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Fetch OTP record from admin_otp_store
    const record = await getAdminOTPRecord(normalizedEmail, "login");

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    // Check expiry
    if (new Date() > new Date(record.expires_at)) {
      await deleteAdminOTP(normalizedEmail, "login");
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please sign in again.",
      });
    }

    const attempts = record.attempts || 0;

    // Wrong OTP
    if (record.otp !== otp) {
      const newAttempts = attempts + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        await deleteAdminOTP(normalizedEmail, "login");
        return res.status(400).json({
          success: false,
          message: "Too many incorrect attempts. Please sign in again.",
        });
      }

      await updateAdminOTPAttempts(normalizedEmail, "login", newAttempts);

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${MAX_ATTEMPTS - newAttempts} attempt${MAX_ATTEMPTS - newAttempts !== 1 ? "s" : ""} left.`,
      });
    }

    // OTP correct — delete record and issue JWT
    await deleteAdminOTP(normalizedEmail, "login");

    const adminResult = await pool.query(
      "SELECT id, email, name FROM admins WHERE email = $1",
      [normalizedEmail]
    );

    const admin = adminResult.rows[0];

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export default verifyAdminOTP;