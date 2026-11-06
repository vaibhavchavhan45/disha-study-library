import { z } from "zod";


export const bookingSchema = z.object({
  fullName: z.string().min(3).max(50).regex(/^[A-Za-z\s]+$/, "Invalid full name."),
  email: z.string().email("Invalid email."),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number."),
  fieldOfPreparation: z.string().min(2).max(100, "Invalid field of preparation."),
});