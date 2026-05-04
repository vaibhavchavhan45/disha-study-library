import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

import { getAdminToken, getAdminUser } from "../../utils/adminStorage";
import { changePasswordApi } from "../../services/authApi";

import BlockedScreen from "./BlockedScreen";
import ChangePasswordHeader from "../changeUI/ChangePasswordHeader";
import ChangePasswordForm from "../changeUI/ChangePasswordForm";
import ChangePasswordFooter from "../changeUI/ChangePasswordFooter";

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


function AdminChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS - getAttempts());
  const [timeLeft, setTimeLeft] = useState("");

  const admin  = getAdminUser();
  const isDev  = ADMIN_DEV_EMAILS.includes(admin?.email);

  const busy    = status === "loading";
  const blocked = status === "locked" || status === "cooldown";

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
  }, []);

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
        handleFailedAttempt(data.message || "Incorrect current password");
        return;
      }

      if (!isDev) setLastReset(Date.now());
      clearAttempts();
      setStatus("success");

    } catch (err) {
      handleFailedAttempt(
        err.response?.data?.message || "Incorrect current password"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">

        <ChangePasswordHeader
          blocked={blocked}
          busy={busy}
          onClose={onClose}
        />

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
            <ChangePasswordForm
              currentPassword={currentPassword}
              setCurrentPassword={(val) => { setCurrentPassword(val); setStatus("idle"); setError(""); }}
              newPassword={newPassword}
              setNewPassword={(val) => { setNewPassword(val); setStatus("idle"); setError(""); }}
              confirmPassword={confirmPassword}
              setConfirmPassword={(val) => { setConfirmPassword(val); setStatus("idle"); setError(""); }}
              status={status}
              error={error}
              attemptsLeft={attemptsLeft}
            />
          )}
        </div>

        {status !== "success" && (
          <ChangePasswordFooter
            blocked={blocked}
            busy={busy}
            onClose={onClose}
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </div>
  );
}

export default AdminChangePassword