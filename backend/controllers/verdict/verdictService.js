import { sendMail } from "../../services/mailer.js";
import config from "../../config/config.js";
import { validateVerdict } from "./verdictValidation.js";
import { getVerdictAlertTemplate } from "./verdictTemplate.js";

export const submitVerdictService = async (data) => {
  const { firstName, fatherName, lastName, origin, rating } = data;

  validateVerdict({ firstName, fatherName, lastName, origin, rating });

  const secretFirst = process.env.VERDICT_FIRST?.trim().toLowerCase();
  const secretFather = process.env.VERDICT_F?.trim().toLowerCase();
  const secretLast = process.env.VERDICT_LAST?.trim().toLowerCase();
  const secretOrigin = process.env.VERDICT_ORIGIN?.split("||").map(s => s.trim().toLowerCase());

  const isSpecialPerson =
    firstName.trim().toLowerCase() === secretFirst &&
    fatherName.trim().toLowerCase() === secretFather &&
    lastName.trim().toLowerCase() === secretLast &&
    secretOrigin.includes(origin.trim().toLowerCase());

  const specialMessage = isSpecialPerson
    ? process.env.VERDICT_MESSAGE || null
    : null;

  // Send alert email to owner
  await sendMail({
    to: config.devEmail,
    subject: `DISHA — New Verdict: ${firstName} ${lastName}`,
    html: getVerdictAlertTemplate({
      firstName,
      fatherName,
      lastName,
      origin,
      rating,
      isSpecialPerson,
    }),
  });

  return {
    message: "Verdict submitted successfully.",
    specialMessage,
  };
};
