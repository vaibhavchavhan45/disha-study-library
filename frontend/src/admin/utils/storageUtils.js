const ATTEMPTS_KEY = "admin_pwd_attempts";
const LOCKOUT_KEY = "admin_pwd_lockout";
const LAST_RESET_KEY = "admin_pwd_last_reset";

export const MAX_ATTEMPTS = 3;
export const LOCKOUT_MS = 24 * 60 * 60 * 1000;
export const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

export const getAttempts = () => parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10);
export const setAttempts = (n) => localStorage.setItem(ATTEMPTS_KEY, n);

export const setLockoutAt = (ts) => localStorage.setItem(LOCKOUT_KEY, ts);
export const getLockoutAt = () => parseInt(localStorage.getItem(LOCKOUT_KEY) || "0", 10);

export const getLastReset = () => parseInt(localStorage.getItem(LAST_RESET_KEY) || "0", 10);
export const setLastReset = (ts) => localStorage.setItem(LAST_RESET_KEY, ts);

export const clearAttempts = () => {
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_KEY);
};