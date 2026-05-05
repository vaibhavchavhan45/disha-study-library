import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, html, replyTo, isAdmin }) => {
  await resend.emails.send({
    from: `Disha Study Library <onboarding@resend.dev>`,
    ...(isAdmin ? { bcc: to } : { to }),
    replyTo,
    subject,
    html,
  });
};