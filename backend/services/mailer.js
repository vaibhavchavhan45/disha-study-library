import nodemailer from "nodemailer";
import config from "../config/config.js";

const { emailUser, emailPass } = config;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  port: 587,
  secure: false,
  family: 4, // Force IPv6. If mail does not work on some networks, change this to 4.
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