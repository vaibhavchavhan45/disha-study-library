import pool from "../../../db/db.js";
import bcrypt from "bcryptjs";
import { ADMIN_DEV_EMAILS } from "../../../config/devConfig.js";
import { sendMail } from "../../../services/mailer.js";
import { saveAdminOTPRecord } from "./adminOtpRepository.js";
import adminOtpTemplate from "./template/adminOtpTemplate.js";

// Generate 6-digit OTP for admin only
const generateAdminOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    const adminResult = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [normalizedEmail]
    );

    if (adminResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const admin = adminResult.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate 6-digit admin OTP
    const otp = generateAdminOTP();

    // Save OTP to admin_otp_store with purpose = 'login'
    await saveAdminOTPRecord(normalizedEmail, otp, "login");

    // Bypass email check — dev admin can always receive OTP without any block
    const isDevAdmin = ADMIN_DEV_EMAILS.includes(normalizedEmail);

    // Send OTP email using admin-specific template
    await sendMail({
      to: normalizedEmail,
      subject: "Admin Login Verification — DISHA Library",
      html: adminOtpTemplate(otp),
      isAdmin: !isDevAdmin,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export default loginAdmin;