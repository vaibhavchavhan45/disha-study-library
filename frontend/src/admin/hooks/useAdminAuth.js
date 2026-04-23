import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAdminToken } from "../utils/adminStorage";
import { isLocked, isOnCooldown } from "../utils/passwordUtils";
import {
  getAttempts,
  setAttempts,
  setLockoutAt,
  setLastReset,
  clearAttempts,
  MAX_ATTEMPTS,
  LOCKOUT_MS,
  COOLDOWN_MS,
} from "../utils/storageUtils";
import { ADMIN_DEV_EMAILS } from "../../config/devConfig";

// dev email
export const isDev = (email) => ADMIN_DEV_EMAILS.includes(email);

// format ms remaining → "2h 15m" / "1d 4h"
export const formatTimeLeft = (untilTs) => {
  const ms = untilTs - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

//  password rules (no currentPassword — for forgot flow)
export const validateNewPasswords = (newPassword, confirmPassword) => {
  if (!newPassword)                         return "Please enter a new password.";
  if (newPassword.length < 8)               return "Minimum 8 characters required.";
  if (!/[A-Z]/.test(newPassword))           return "Must contain at least one uppercase letter.";
  if (!/[0-9]/.test(newPassword))           return "Must contain at least one number.";
  if (!/[!@#$%^&*]/.test(newPassword))      return "Must contain a special character (!@#$%^&*).";
  if (!confirmPassword)                     return "Please confirm your password.";
  if (newPassword !== confirmPassword)      return "Passwords do not match.";
  return null;
};

// useAdminLoginGuard (Redirects to dashboard if already logged in. Use in AdminLogin.)
 
export const useAdminLoginGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdminToken()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);
};

// useAttemptTracker (Shared lockout/cooldown state for the forgot-password page.)
export const useAttemptTracker = (email) => {
  const [status, setStatus]         = useState("idle"); // idle | error | locked | cooldown | success
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS - getAttempts());
  const [timeLeft, setTimeLeft]     = useState("");
  const [errorMsg, setErrorMsg]     = useState("");

  // check on mount
  useEffect(() => {
    if (isDev(email)) return;

    if (isLocked()) {
      const lockoutAt = parseInt(localStorage.getItem("admin_pwd_lockout") || "0", 10);
      setStatus("locked");
      setTimeLeft(formatTimeLeft(lockoutAt + LOCKOUT_MS));
      return;
    }
    if (isOnCooldown()) {
      const lastReset = parseInt(localStorage.getItem("admin_pwd_last_reset") || "0", 10);
      setStatus("cooldown");
      setTimeLeft(formatTimeLeft(lastReset + COOLDOWN_MS));
    }
  }, [email]);

  const registerFailedAttempt = (msg) => {
    // bypass — no lockout, just show error
    if (isDev(email)) {
      setErrorMsg(msg);
      setStatus("error");
      return;
    }

    const newAttempts = getAttempts() + 1;
    setAttempts(newAttempts);
    const left = MAX_ATTEMPTS - newAttempts;

    if (left <= 0) {
      setLockoutAt(Date.now());
      const lockoutAt = parseInt(localStorage.getItem("admin_pwd_lockout") || "0", 10);
      setStatus("locked");
      setTimeLeft(formatTimeLeft(lockoutAt + LOCKOUT_MS));
    } else {
      setAttemptsLeft(left);
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  const registerSuccess = () => {
    clearAttempts();
    if (!isDev(email)) setLastReset(Date.now());
    setStatus("success");
  };

  const clearError = () => {
    setErrorMsg("");
    setStatus("idle");
  };

  return {
    status,
    setStatus,
    attemptsLeft,
    timeLeft,
    errorMsg,
    setErrorMsg,
    registerFailedAttempt,
    registerSuccess,
    clearError,
    isBlocked: status === "locked" || status === "cooldown",
  };
};