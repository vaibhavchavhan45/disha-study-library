import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import useOTP from "../../Hooks/useOTP";
import OTPBoxes from "./OTPBoxes";
import { isValidGmail } from "./OTPHelpers";

const OTPInput = forwardRef(({ onVerified, onOtpSent }, ref) => {
  const {
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
  } = useOTP(onVerified);

  const boxRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const autoSentRef = useRef(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      autoSentRef.current = false;
      resetOTP();
    },
  }));

  useEffect(() => {
    if (
      !autoSentRef.current &&
      !otpSent &&
      isValidGmail(email)
    ) {
      autoSentRef.current = true;
      onOtpSent?.();
      sendOTP(email.trim().toLowerCase());
    }
  }, [email]);

  const renderResendSection = () => {
    // 3 wrong attempts — stop timer and  resend dikhao
    if (maxAttemptsExceeded) {
      if (resendCount <= MAX_RESEND) {
        return (
          <button
            type="button"
            onClick={resendOTP}
            className="text-cyan-400/70 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Resend OTP
          </button>
        );
      }
      return null;
    }

    // Timer running
    if (timer > 0) {
      return <span>Resend in {timer}s</span>;
    }

    // Timer end, resend allowed
    if (resendCount <= MAX_RESEND) {
      return (
        <button
          type="button"
          onClick={resendOTP}
          className="text-cyan-400/70 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          Resend OTP
        </button>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-white/70 text-xs tracking-widest uppercase">
          Email Address
        </label>

        <div className="relative group">
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={otpSent || otpVerified}
            className="relative z-10 w-full bg-transparent border border-white/[0.08] rounded-3xl px-5 py-3.5 text-white placeholder:text-white/20 text-sm tracking-[0.01em] outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-white/[0.18] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.45)] disabled:opacity-50"
          />

          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_68%)]" />

          {busy && !otpSent && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: "spin 0.8s linear infinite" }}
              >
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
          )}

          {otpVerified && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34d399"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* OTP Boxes */}
      {otpSent && !otpVerified && (
        <div className="flex flex-col gap-3 mt-2">
          <p
            className={`text-xs ${resendCount > MAX_RESEND ? "text-amber-400/70" : "text-white/40"
              }`}
          >
            {resendCount > MAX_RESEND
              ? "Too many attempts. Please try again later."
              : resendCount > 0
                ? "OTP has been sent to your Gmail."
                : "Enter the 4-digit code sent to your Gmail."}
          </p>

          <OTPBoxes
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            otpVerified={otpVerified}
            otpInvalid={otpInvalid}
            busy={busy}
            timer={timer}
            verifyOTP={verifyOTP}
            boxRefs={boxRefs}
          />

          {error && !busy && (
            <p className="text-red-400 text-xs">
              {error.startsWith("Invalid OTP.")
                ? "Invalid OTP"
                : error}

              {error.startsWith("Invalid OTP.") && (
                <span className="text-white/40 ml-4">
                  ({error.replace("Invalid OTP. ", "")})
                </span>
              )}
            </p>
          )}

          <div className="text-xs text-white/30">
            {renderResendSection()}
          </div>
        </div>
      )}

      {error && !otpInvalid && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </div>
  );
});

OTPInput.displayName = "OTPInput";

export default OTPInput;