import { z } from "zod";


export const sendOTPSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});


export const verifyOTPSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  otp: z.string().regex(/^\d{4,6}$/, "OTP must be 4 or 6 digits."),
});