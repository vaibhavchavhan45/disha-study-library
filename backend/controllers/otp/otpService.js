import { sendMail } from "../../services/mailer.js";
import { DEV_EMAILS } from "../../config/devConfig.js";
import { MAX_ATTEMPTS } from "../../Data/maxAttempts.js";
import {
  getBlockByIP,
  insertBlock,
  updateBlock,
  saveOTPRecord,
  getLatestOTP,
  updateOTPAttempts,
  deleteOTP,
} from "./otpRepository.js";
import { validateSendOTP, validateVerifyOTP } from "./otpValidation.js";
import { getOTPTemplate } from "./otpTemplate.js";
import { generateOTP } from "../otp/otpHelper.js";

// send OTP logic
export const sendOTPService = async (email, ip) => {
  validateSendOTP(email);

  const normalizedEmail = email?.trim().toLowerCase();

  // Check if this IP already has a block record
  const block = await getBlockByIP(ip);

  // apply block logic
  if (!DEV_EMAILS.includes(normalizedEmail)) {
    if (block && block.blocked_until && new Date() < block.blocked_until) {
      throw {
        statusCode: 429,
        message: "Too many attempts. Try again after 24 hours.",
      };
    }
  }

  // Generate OTP
  const otp = generateOTP();

  // Save OTP in DB
  await saveOTPRecord(normalizedEmail, otp);

  // Send OTP email
  await sendMail({
    to: normalizedEmail,
    subject: "Your DISHA Library OTP",
    html: getOTPTemplate(otp),
  });

  // Handle resend count / block logic
  if (!block) {
    // First request from this IP
    await insertBlock(ip);
  } else {
    const count = block.resend_count + 1;

    if (count >= 3) {
      // Block for 24 hours after 3 attempts
      const blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await updateBlock(ip, count, blockedUntil);
    } else {
      // Just increase resend count
      await updateBlock(ip, count);
    }
  }

  return { message: "OTP sent successfully." };
};

// verify OTP logic
export const verifyOTPService = async ({ email, otp }) => {
  validateVerifyOTP(email, otp);

  const normalizedEmail = email?.trim().toLowerCase();

  const record = await getLatestOTP(normalizedEmail);

  if (!record) {
    return {
      valid: false,
      code: "NO_OTP",
      message: "No OTP found. Please request a new one.",
    };
  }

  if (new Date() > new Date(record.expires_at)) {
    await deleteOTP(normalizedEmail);

    return {
      valid: false,
      code: "OTP_EXPIRED",
      message: "OTP expired. Please resend.",
    };
  }

  const attempts = record.attempts || 0;

  if (record.otp !== otp) {
    const newAttempts = attempts + 1;

    if (newAttempts >= MAX_ATTEMPTS) {
      await deleteOTP(normalizedEmail);

      return {
        valid: false,
        code: "MAX_ATTEMPTS_EXCEEDED",
        message: "Too many incorrect attempts. Please request a new OTP.",
      };
    }

    await updateOTPAttempts(normalizedEmail, newAttempts);

    return {
      valid: false,
      code: "INVALID_OTP",
      message: `Invalid OTP. Attempts left: ${MAX_ATTEMPTS - newAttempts}`,
    };
  }

  await deleteOTP(normalizedEmail);

  return {
    valid: true,
    code: "OTP_VERIFIED",
    message: "OTP verified successfully.",
  };
};