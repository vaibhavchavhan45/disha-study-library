import pool from "../../../db/db.js";
import { ADMIN_DEV_EMAILS } from "../../../config/devConfig.js";
import { sendMail } from "../../../services/mailer.js";
import { saveAdminOTPRecord } from "./adminOtpRepository.js";
import adminOtpTemplate from "./template/adminOtpTemplate.js";

// Generate 6-digit OTP
const generateAdminOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const adminResult = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [normalizedEmail]
    );

    if (adminResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin account found with this email.",
      });
    }

    // Generate OTP and save with purpose = 'reset'
    const otp = generateAdminOTP();
    await saveAdminOTPRecord(normalizedEmail, otp, "reset");

    const isDevAdmin = ADMIN_DEV_EMAILS.includes(normalizedEmail);

    // Send OTP email using admin template
    await sendMail({
      to: normalizedEmail,
      subject: "Admin Password Reset OTP — DISHA Library",
      html: adminOtpTemplate(otp, "forgot"),
      isAdmin: !isDevAdmin,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

export default forgotPassword;