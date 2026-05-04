import OTPBoxes from "../../../Components/CTA/OTPBoxes";

const OTP_LENGTH = 6;
const MAX_RESEND = 3;

export default function OTPStep({
  email,
  otpCode, setOtpCode,
  otpVerified, otpInvalid, otpBusy,
  timer, resendCount, resendBusy,
  boxRefs,
  onVerify, onResend,
}) {

  const renderResend = () => {
    if (resendCount >= MAX_RESEND) {
      return (
        <p className="text-amber-400/70 text-xs text-center">
          Maximum resends reached. Request a new login.
        </p>
      );
    }
    if (timer > 0) {
      return (
        <p className="text-white/30 text-xs text-center">
          Resend in <span className="text-white/50">{timer}s</span>
        </p>
      );
    }
    return (
      <button
        type="button"
        onClick={onResend}
        disabled={resendBusy}
        className="text-cyan-400/70 hover:text-cyan-400 text-xs transition-colors disabled:opacity-50 w-full text-center"
      >
        {resendBusy ? "Resending…" : `Resend OTP (${MAX_RESEND - resendCount} left)`}
      </button>
    );
  };

  return (
    <div className="space-y-5">
      <p className="text-white/40 text-xs text-center">
        Enter the 6-digit OTP sent to <span className="text-white/70">{email}</span>
      </p>

      <div className="flex justify-center">
        <OTPBoxes
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          otpVerified={otpVerified}
          otpInvalid={otpInvalid}
          busy={otpBusy}
          timer={timer}
          verifyOTP={onVerify}
          boxRefs={boxRefs}
          length={OTP_LENGTH}
        />
      </div>

      <div className="mt-1">
        {renderResend()}
      </div>
    </div>
  );
}