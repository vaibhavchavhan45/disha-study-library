export const validateVerdict = ({ firstName, fatherName, lastName, origin, rating }) => {
  if (!firstName || typeof firstName !== "string" || firstName.trim().length < 1) {
    const err = new Error("First name is required.");
    err.statusCode = 400;
    throw err;
  }

  if (!fatherName || typeof fatherName !== "string" || fatherName.trim().length < 1) {
    const err = new Error("Father's name is required.");
    err.statusCode = 400;
    throw err;
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim().length < 1) {
    const err = new Error("Last name is required.");
    err.statusCode = 400;
    throw err;
  }

  if (!origin || typeof origin !== "string" || origin.trim().length < 1) {
    const err = new Error("Origin is required.");
    err.statusCode = 400;
    throw err;
  }

  if (!rating || typeof rating !== "number" || rating < 1 || rating > 10) {
    const err = new Error("Rating must be between 1 and 10.");
    err.statusCode = 400;
    throw err;
  }
};
