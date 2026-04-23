import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name must not exceed 50 characters.")
    .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces."),

  email: z
    .string({ required_error: "Email is required." })
    .regex(/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/, "Enter a valid Gmail address."),

  phone: z
    .string({ required_error: "Phone number is required." })
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),

  fieldOfPreparation: z
    .string({ required_error: "Field of preparation is required." })
    .min(2, "Field of preparation must be at least 2 characters.")
    .max(100, "Field of preparation must not exceed 100 characters."),
});