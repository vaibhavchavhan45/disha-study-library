import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import {
  getAdminOTPRecord,
  updateAdminOTPAttempts,
  deleteAdminOTP,
} from "./adminOtpRepository.js";

const MAX_ATTEMPTS = 3;

const forgotResetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Fetch reset OTP record
    const record = await getAdminOTPRecord(normalizedEmail, "reset");

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    // Check expiry
    if (new Date() > new Date(record.expires_at)) {
      await deleteAdminOTP(normalizedEmail, "reset");
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    const attempts = record.attempts || 0;

    // Wrong OTP
    if (record.otp !== otp) {
      const newAttempts = attempts + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        await deleteAdminOTP(normalizedEmail, "reset");
        return res.status(400).json({
          success: false,
          message: "Too many incorrect attempts. Please request a new OTP.",
        });
      }

      await updateAdminOTPAttempts(normalizedEmail, "reset", newAttempts);

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${MAX_ATTEMPTS - newAttempts} attempt${MAX_ATTEMPTS - newAttempts !== 1 ? "s" : ""} left.`,
      });
    }

    // OTP correct — update password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE admins SET password_hash = $1 WHERE email = $2",
      [hashedPassword, normalizedEmail]
    );

    // Cleanup OTP record
    await deleteAdminOTP(normalizedEmail, "reset");

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    next(error);
  }
};

export default forgotResetPassword;