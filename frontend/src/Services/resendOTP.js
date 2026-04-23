import { sendOTPService } from "./sendOTP";

export const resendOTPService = async (email) => {
  return await sendOTPService(email);
};