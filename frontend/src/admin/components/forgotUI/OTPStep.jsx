import { ArrowLeft } from "lucide-react";
import OTPBoxes from "../../../Components/CTA/OTPBoxes";

const OTP_LENGTH = 6;
const MAX_RESEND = 3;

function OTPStep({
  email,
  otpCode, setOtpCode,
  otpVerified, otpInvalid, otpBusy,
  timer, resendCount, resendBusy,
  boxRefs,
  onVerify, onResend, onBack,
  error,
}) {

  const renderResend = () => {
    if (resendCount >= MAX_RESEND) {
      return <p className="text-amber-400/70 text-xs text-center">Maximum resends reached.</p>;
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
    <>
      <div className="text-center mb-7">
        <h1 className="syne text-2xl font-bold text-white tracking-tight">Verify OTP</h1>
        <p className="text-white/35 text-sm mt-1">
          Enter the 6-digit OTP sent to <span className="text-white/60">{email}</span>
        </p>
      </div>

      <div className="space-y-5">
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

        <div className="flex justify-center">
          <button
            type="button"
            disabled={otpCode.length !== OTP_LENGTH || otpBusy}
            onClick={() => onVerify(otpCode)}
            className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify OTP
          </button>
        </div>

        <div className="mt-1">{renderResend()}</div>

        {error && <p className="text-rose-400 text-xs text-center">{error}</p>}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            <ArrowLeft size={13} /> Back to Admin Login
          </button>
        </div>
      </div>
    </>
  );
}

export default OTPStep;