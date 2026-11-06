import { z } from "zod";


export const messageSchema = z.object({
  name: z.string().min(2).max(20).regex(/^[A-Za-z\s]+$/, "Invalid name."),
  isValid: z.boolean(),
});