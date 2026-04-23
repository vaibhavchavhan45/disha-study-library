import { messageSchema } from "../../validation/messageValidation.js";

export const validateMessage = (data) => {
  const result = messageSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.errors[0].message;
    throw { statusCode: 400, message };
  }
};