import { z } from "zod";


export const feedbackSchema = z.object({
  name: z.string().min(3).max(50).regex(/^[A-Za-z\s]+$/, "Invalid name."),
  email: z.string().email("Invalid email."),
  category: z.string().min(1, "Invalid category."),
  specify: z.string().optional().or(z.literal("")),
  message: z.string().min(10).max(500, "Invalid message."),
  rating: z.number().min(1).max(5, "Invalid rating."),
}).refine(
  (data) => data.category === "other" ? data.specify && data.specify.trim().length > 0 : true,
  { message: "Please specify your category.", path: ["specify"] }
);