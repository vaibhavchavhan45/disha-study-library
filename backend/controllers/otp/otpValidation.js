import { sendOTPSchema, verifyOTPSchema } from "../../validation/otpValidationZod.js";

export const validateSendOTP = (email) => {
  const result = sendOTPSchema.safeParse({ email });

  if (!result.success) {
    const message = result.error.errors[0].message;
    throw { statusCode: 400, message };
  }
};

export const validateVerifyOTP = (email, otp) => {
  const result = verifyOTPSchema.safeParse({ email, otp });

  if (!result.success) {
    const message = result.error.errors[0].message;
    throw { statusCode: 400, message };
  }
};