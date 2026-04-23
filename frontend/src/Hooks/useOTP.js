import { useState, useRef } from "react";
import { TIMER_SECONDS, MAX_RESEND } from "../config/otp_config";
import { sendOTPService } from "../Services/sendOTP";
import { verifyOTPService } from "../Services/verifyOTP";
import { resendOTPService } from "../Services/resendOTP";

export default function useOTP(onVerified) {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [maxAttemptsExceeded, setMaxAttemptsExceeded] = useState(false);

  const intervalRef = useRef(null);

  const resetOTP = () => {
    setEmail("");
    setOtpCode("");
    setOtpSent(false);
    setOtpVerified(false);
    setOtpInvalid(false);
    setResendCount(0);
    setTimer(0);
    setError("");
    setBusy(false);
    setMaxAttemptsExceeded(false);
    clearInterval(intervalRef.current);
  };

  const startTimer = () => {
    setTimer(TIMER_SECONDS);

    intervalRef.current = setInterval(() => {
      setTimer((previous) => {
        if (previous <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  };

  const sendOTP = async (emailOverride) => {
    const target = emailOverride || email;

    setError("");
    setOtpInvalid(false);

    if (!target || !target.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setBusy(true);

      await sendOTPService(target);

      setOtpSent(true);
      startTimer();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const resendOTP = async () => {
    const nextCount = resendCount + 1;
    setResendCount(nextCount);

    if (nextCount > MAX_RESEND) return;

    setOtpCode("");
    setOtpInvalid(false);
    setMaxAttemptsExceeded(false);
    setError("");
    clearInterval(intervalRef.current);

    try {
      setBusy(true);

      await resendOTPService(email);

      startTimer();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const verifyOTP = async (code) => {
    const target = code || otpCode;

    setError("");
    setOtpInvalid(false);

    if (!target || target.length !== 4) return;

    try {
      setBusy(true);

      await verifyOTPService(email, target);

      setOtpVerified(true);
      onVerified(email);
    } catch (error) {
      setOtpInvalid(true);
      setError(error.message);

      if (
        error.code === "MAX_ATTEMPTS_EXCEEDED" ||
        error.message?.includes("Too many incorrect attempts")
      ) {
        clearInterval(intervalRef.current);
        setTimer(0);
        setMaxAttemptsExceeded(true);
      }
    } finally {
      setBusy(false);
    }
  };

  return {
    email,
    setEmail,
    otpCode,
    setOtpCode,
    otpSent,
    otpVerified,
    otpInvalid,
    resendCount,
    timer,
    error,
    busy,
    maxAttemptsExceeded,
    sendOTP,
    resendOTP,
    verifyOTP,
    resetOTP,
    MAX_RESEND,
  };
}