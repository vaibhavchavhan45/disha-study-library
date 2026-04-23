import { z } from "zod";

export const sendOTPSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
});

export const verifyOTPSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
  otp: z
    .string({ required_error: "OTP is required." })
    .regex(/^\d{4,6}$/, "OTP must be 4 or 6 digits."),
});