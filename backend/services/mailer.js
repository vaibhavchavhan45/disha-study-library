import nodemailer from "nodemailer";
import config from "../config/config.js";

const { emailUser, emailPass } = config;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  family: 4,
});

export const sendMail = async ({ to, subject, html, replyTo, isAdmin }) => {
  await transporter.sendMail({
    from: `Disha Study Library <${emailUser}>`,
    ...(isAdmin ? { bcc: to } : { to }),
    replyTo,
    subject,
    html,
  });
};