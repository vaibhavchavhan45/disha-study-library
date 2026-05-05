import { TransactionalEmailsClient } from "@getbrevo/brevo/transactionalEmails";
import config from "../config/config.js";

const client = new TransactionalEmailsClient({ apiKey: config.brevoApiKey });

const parseReplyTo = (replyTo) => {
  if (!replyTo) return undefined;
  const match = replyTo.match(/^(.+?)\s*<(.+)>$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  if (replyTo.includes("@")) return { email: replyTo };
  return undefined;
};

const parseEmails = (emails) => {
  if (!emails) return undefined;
  return emails.split(",").map((e) => ({ email: e.trim() }));
};

export const sendMail = async ({ to, subject, html, replyTo, isAdmin }) => {
  await client.sendTransacEmail({
    sender: { name: "Disha Study Library", email: config.emailUser },
    to: isAdmin ? undefined : [{ email: to }],
    bcc: isAdmin ? parseEmails(to) : undefined,
    replyTo: parseReplyTo(replyTo),
    subject,
    htmlContent: html,
  });
};