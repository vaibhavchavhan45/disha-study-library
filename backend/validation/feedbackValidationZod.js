import { z } from "zod";

export const feedbackSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required." })
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name must not exceed 50 characters.")
      .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces."),

    email: z
      .string({ required_error: "Email is required." })
      .regex(
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/,
        "Enter a valid Gmail address."
      ),

    category: z
      .string({ required_error: "Category is required." })
      .min(1, "Please select a category."),

    specify: z.string().optional().or(z.literal("")),

    message: z
      .string({ required_error: "Message is required." })
      .min(10, "Message must be at least 10 characters.")
      .max(500, "Message must not exceed 500 characters."),

    rating: z
      .number({ required_error: "Rating is required." })
      .min(1, "Please select a rating.")
      .max(5, "Rating must be between 1 and 5."),
  })
  .refine(
    (data) => {
      if (data.category === "other") {
        return data.specify && data.specify.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify your category.",
      path: ["specify"],
    }
  );