import { feedbackSchema } from "../../validation/feedbackValidationZod.js";

export const validateFeedback = (data) => {
  const result = feedbackSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues[0].message;
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
};