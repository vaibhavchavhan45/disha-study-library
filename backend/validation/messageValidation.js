import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name must not exceed 20 characters.")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces."),
  isValid: z.boolean({ required_error: "isValid is required." }),
});

