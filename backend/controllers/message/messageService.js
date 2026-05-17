import { sendMail } from "../../services/mailer.js";
import { defaultMessages } from "../../Data/defaultMessages.js";
import { specialMessages } from "../../Data/specialMessages.js";
import { errorMessages } from "../../Data/errorMessages.js";
import config from "../../config/config.js";
import { getMessageTemplate } from "./messageTemplate.js";
import { validateMessage } from "./messageValidation.js";

const getRandomMessage = (messages) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getMessageService = async (name, isValid) => {
  validateMessage({ name, isValid });

  const trimmed = name?.trim();
  const normalized = trimmed?.toLowerCase();

  let message;
  let messageType;

  if (!isValid) {
    message = getRandomMessage(errorMessages);
    messageType = "error";
  } 
  else if (specialMessages[normalized]) {
    message = getRandomMessage(specialMessages[normalized]);
    messageType = "success";
  } 
  else {
    message = getRandomMessage(defaultMessages);
    messageType = "success";
  }

  await sendMail({
    to: config.devEmail,
    subject: `DISHA — New Visitor: ${trimmed}`,
    html: getMessageTemplate(trimmed, message, messageType, !!specialMessages[normalized]),
  });

  return { message, messageType };
};