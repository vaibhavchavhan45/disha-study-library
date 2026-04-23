import { useState, useEffect } from "react";
import {
  X,
  Loader2,
  KeyRound,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

import { getAdminToken, getAdminUser } from "../../utils/adminStorage";
import { changePasswordApi } from "../../services/authApi";

import PasswordInput from "./PasswordInput";
import BlockedScreen from "./BlockedScreen";

import {
  getAttempts,
  setAttempts,
  setLockoutAt,
  setLastReset,
  clearAttempts,
  MAX_ATTEMPTS,
  LOCKOUT_MS,
  COOLDOWN_MS
} from "../../utils/storageUtils";

import {
  isLocked,
  isOnCooldown,
  validatePassword
} from "../../utils/passwordUtils";

import { ADMIN_DEV_EMAILS } from "../../../config/devConfig";

export default function ResetPasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error | locked | cooldown
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS - getAttempts());
  const [timeLeft, setTimeLeft] = useState("");

  const admin  = getAdminUser();
  const isDev  = ADMIN_DEV_EMAILS.includes(admin?.email);

  const busy    = status === "loading";
  const blocked = status === "locked" || status === "cooldown";

  // ⏱ helper for UI time label
  const getTimeLeftLabel = (fromTs, duration) => {
    const ms = fromTs + duration - Date.now();
    if (ms <= 0) return null;

    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);

    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  // initial check
  useEffect(() => {
    if (isDev) return;

    if (isLocked()) {
      setStatus("locked");
      setTimeLeft(getTimeLeftLabel(Date.now(), LOCKOUT_MS));
      return;
    }

    if (isOnCooldown()) {
      setStatus("cooldown");
      setTimeLeft(getTimeLeftLabel(Date.now(), COOLDOWN_MS));
    }
  }, [isDev]);

  // failed attempt handler
  const handleFailedAttempt = (msg) => {
    if (isDev) {
      setError(msg);
      setStatus("error");
      return;
    }

    const newAttempts = getAttempts() + 1;
    setAttempts(newAttempts);

    const left = MAX_ATTEMPTS - newAttempts;

    if (left <= 0) {
      setLockoutAt(Date.now());
      setStatus("locked");
      setTimeLeft(getTimeLeftLabel(Date.now(), LOCKOUT_MS));
    } else {
      setAttemptsLeft(left);
      setError(msg);
      setStatus("error");
    }
  };

  // submit
  const handleSubmit = async () => {
    if (blocked) return;

    const validationError = validatePassword(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const data = await changePasswordApi(
        { currentPassword, newPassword },
        getAdminToken()
      );

      if (!data.success) {
        handleFailedAttempt(
          data.message || "Incorrect current password"
        );
        return;
      }

      // success
      if (!isDev) setLastReset(Date.now());
      clearAttempts();

      setStatus("success");
      setTimeout(onClose, 2000);

    } catch (err) {
      handleFailedAttempt(
        err.response?.data?.message ||
        "Incorrect current password"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="relative bg-gray-900 px-6 pt-6 pb-5 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
              {blocked
                ? <ShieldAlert size={22} className="text-red-400" />
                : <KeyRound size={22} className="text-white" />}
            </div>

            <h2 className="text-white font-semibold">
              {blocked ? "Access Restricted" : "Reset Password"}
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={busy}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">

          {blocked && (
            <BlockedScreen type={status} timeLeft={timeLeft} />
          )}

          {status === "success" && (
            <div className="text-center">
              <ShieldCheck size={32} className="mx-auto text-green-500" />
              <p className="mt-2 font-semibold">Password Updated</p>
            </div>
          )}

          {!blocked && status !== "success" && (
            <div className="space-y-4">
              <PasswordInput
                label="Current Password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setStatus("idle");
                  setError("");
                }}
              />

              <PasswordInput
                label="New Password"
                placeholder="Min 8 chars, uppercase, number, special"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setStatus("idle");
                  setError("");
                }}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setStatus("idle");
                  setError("");
                }}
              />

              {status === "error" && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {status !== "success" && (
          <div className="px-6 pb-6 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 border rounded-xl py-2"
            >
              Cancel
            </button>

            {!blocked && (
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gray-900 text-white rounded-xl py-2 flex items-center justify-center gap-2"
              >
                {busy
                  ? <Loader2 size={14} className="animate-spin" />
                  : "Update"}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}