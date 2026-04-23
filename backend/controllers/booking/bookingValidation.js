import { bookingSchema } from "../../validation/bookingValidationZod.js";

export const validateBooking = (data) => {
  const result = bookingSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.errors[0].message;
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
};