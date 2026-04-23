import { sendMail } from "../../services/mailer.js";
import config from "../../config/config.js";
import { validateFeedback } from "./feedbackValidation.js";
import { getFeedbackTemplate } from "./feedbackTemplate.js";

export const submitFeedbackService = async (data) => {
  const { name, email, category, specify, message, rating } = data;

  validateFeedback({ name, email, category, specify, message, rating });

  await sendMail({
    to: config.devEmail,
    subject: `DISHA — New Feedback: ${name}`,
    html: getFeedbackTemplate({ name, email, category, specify, message, rating }),
    replyTo: `${name} <${email}>`,
  });
  
  return { message: "Feedback submitted successfully." };
};