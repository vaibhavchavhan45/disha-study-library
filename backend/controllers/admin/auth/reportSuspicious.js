import { sendMail } from "../../../services/mailer.js";
import config from "../../../config/config.js";
import reportTemplate from "./template/reportTemplate.js";

const reportSuspicious = async (req, res, next) => {
  try {
    const { email } = req.body;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      req.ip ||
      "Unknown";
    const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    await sendMail({
      to: config.devEmail,
      subject: "⚠️ Suspicious Admin Login Attempt",
      html: reportTemplate(email, ip, time),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default reportSuspicious;