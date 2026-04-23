import { sendOTPService, verifyOTPService } from "./otpService.js";


// Send OTP controller
export const sendOTP = async (req, res) => {
  try {
    // Get user IP
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Call service
    const result = await sendOTPService(req.body.email, ip);

    return res.status(200).json(result);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: "Failed to send OTP." });
  }
};


// Verify OTP controller
export const verifyOTP = async (req, res) => {
  try {
    const result = await verifyOTPService(req.body);

    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Failed to verify OTP." });
  }
};