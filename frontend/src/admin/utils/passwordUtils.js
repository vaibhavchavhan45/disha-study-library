import { getLockoutAt, getLastReset, clearAttempts, LOCKOUT_MS, COOLDOWN_MS } from "./storageUtils";

export const isLocked = () => {
  const at = getLockoutAt();
  if (!at) return false;

  if (Date.now() < at + LOCKOUT_MS) return true;

  clearAttempts();
  return false;
};

export const isOnCooldown = () => {
  const last = getLastReset();
  if (!last) return false;

  return Date.now() < last + COOLDOWN_MS;
};

export const validatePassword = (currentPassword, newPassword, confirmPassword) => {
  if (!currentPassword) return "Enter current password";
  if (newPassword === currentPassword) return "Must be different";
  if (newPassword.length < 8) return "Min 8 chars";
  if (!/[A-Z]/.test(newPassword)) return "Need uppercase";
  if (!/[0-9]/.test(newPassword)) return "Need number";
  if (!/[!@#$%^&*]/.test(newPassword)) return "Need special char";
  if (newPassword !== confirmPassword) return "Passwords mismatch";

  return null;
};