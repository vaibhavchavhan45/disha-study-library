import { sendMail } from "../../services/mailer.js";
import config from "../../config/config.js";
import { validateVerdict } from "./verdictValidation.js";
import { getVerdictAlertTemplate } from "./verdictTemplate.js";

export const submitVerdictService = async (data) => {
  const { firstName, lastName, origin, rating } = data;

  validateVerdict({ firstName, lastName, origin, rating });

  await sendMail({
    to: config.devEmail,
    subject: `DISHA — New Verdict: ${firstName} ${lastName}`,
    html: getVerdictAlertTemplate({ firstName, lastName, origin, rating }),
  });

  return { message: "Verdict submitted successfully." };
};