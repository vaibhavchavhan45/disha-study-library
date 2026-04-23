import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { forgotPasswordApi, resetPasswordApi } from "../services/authApi";
import { validateNewPasswords } from "../hooks/useAdminAuth";
import Navbar from "../../Components/Navbar";
import { inputCls, labelCls, cardStyle } from "../components/styles/authLoginStyles";
import OTPBoxes from "../../Components/CTA/OTPBoxes";

const OTP_LENGTH    = 6;
const TIMER_SECONDS = 60;
const MAX_RESEND    = 3;

// password field with show/hide
function PasswordField({ label, value, onChange, placeholder, disabled }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={inputCls + " pr-11"}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

const AdminForgotRequest = () => {
  const navigate = useNavigate();

  // steps: "email" | "otp" | "password" | "success"
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP state
  const [otpCode, setOtpCode] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpBusy, setOtpBusy] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [resendCount, setResendCount] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const intervalRef = useRef(null);

  const boxRefs = [
    useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null),
  ];

  // password state
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetBusy, setResetBusy] = useState(false);

  const navItems = [
    { id: "1", label: "Home",  onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Admin", onClick: () => navigate("/admin") },
  ];

  // cleanup timer on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(TIMER_SECONDS);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { clearInterval(intervalRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1 — send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Please enter your admin email.");

    try {
      setLoading(true);
      await forgotPasswordApi({ email });
      setStep("otp");
      startTimer();
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) setError("We both know the truth, you're not an admin. So stop trying and start studying.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — OTP complete, move to password step
  const verifyOTP = (code) => {
    const target = code || otpCode;
    if (!target || target.length !== OTP_LENGTH) return;
    setOtpVerified(true);
    setStep("password");
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCount >= MAX_RESEND || resendBusy) return;

    try {
      setResendBusy(true);
      setOtpCode("");
      setOtpInvalid(false);
      setError("");
      await forgotPasswordApi({ email });
      setResendCount((c) => c + 1);
      startTimer();
    } catch {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResendBusy(false);
    }
  };

  // Step 3 — reset password with OTP + new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateNewPasswords(newPass, confirmPass);
    if (validationError) return setError(validationError);

    try {
      setResetBusy(true);
      await resetPasswordApi({ email, otp: otpCode, password: newPass });
      setStep("success");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      // OTP related error — send back to OTP step
      if (
        msg.includes("Invalid OTP") ||
        msg.includes("expired") ||
        msg.includes("attempts")
      ) {
        setOtpVerified(false);
        setOtpInvalid(true);
        setOtpCode("");
        setStep("otp");
      }
      setError(msg);
    } finally {
      setResetBusy(false);
    }
  };

  // Resend UI
  const renderResend = () => {
    if (resendCount >= MAX_RESEND) {
      return (
        <p className="text-amber-400/70 text-xs text-center">
          Maximum resends reached.
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
        onClick={handleResend}
        disabled={resendBusy}
        className="text-cyan-400/70 hover:text-cyan-400 text-xs transition-colors disabled:opacity-50 w-full text-center"
      >
        {resendBusy ? "Resending…" : `Resend OTP (${MAX_RESEND - resendCount} left)`}
      </button>
    );
  };

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="min-h-screen w-full flex flex-col"
    >
      <Navbar navItems={navItems} />

      <div className="flex-1 flex items-center justify-center px-4 py-12 pt-24 dm">
        <div style={cardStyle} className="p-8">

          {/* ── STEP 1 — Email ── */}
          {step === "email" && (
            <>
              <div className="text-center mb-7">
                <h1 className="syne text-2xl font-bold text-white tracking-tight">
                  Forgot Password
                </h1>
                <p className="text-white/35 text-sm mt-1">
                  Enter your admin email to receive an OTP.
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label className={labelCls}>Admin Email</label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="admin@gmail.com"
                    className={inputCls}
                  />
                </div>

                {error && (
                  <p className="text-rose-400 text-xs text-center">{error}</p>
                )}

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Send OTP"}
                  </button>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
                  >
                    <ArrowLeft size={13} />
                    Back to Admin Login
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── STEP 2 — OTP ── */}
          {step === "otp" && (
            <>
              <div className="text-center mb-7">
                <h1 className="syne text-2xl font-bold text-white tracking-tight">
                  Verify OTP
                </h1>
                <p className="text-white/35 text-sm mt-1">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="text-white/60">{email}</span>
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
                    verifyOTP={verifyOTP}
                    boxRefs={boxRefs}
                    length={OTP_LENGTH}
                  />
                </div>

                {/* manual verify button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    disabled={otpCode.length !== OTP_LENGTH || otpBusy}
                    onClick={() => verifyOTP(otpCode)}
                    className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Verify OTP
                  </button>
                </div>

                <div className="mt-1">{renderResend()}</div>

                {error && (
                  <p className="text-rose-400 text-xs text-center">{error}</p>
                )}

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtpCode("");
                      setError("");
                      clearInterval(intervalRef.current);
                    }}
                    className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
                  >
                    <ArrowLeft size={13} />
                    Back to Admin Login
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3 — New Password ── */}
          {step === "password" && (
            <>
              <div className="text-center mb-7">
                <h1 className="syne text-2xl font-bold text-white tracking-tight">
                  Set New Password
                </h1>
                <p className="text-white/35 text-sm mt-1">
                  OTP verified. Enter your new password.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <PasswordField
                  label="New Password"
                  placeholder="Min 8 chars, uppercase, number, special"
                  value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); setError(""); }}
                  disabled={resetBusy}
                />

                <PasswordField
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  value={confirmPass}
                  onChange={(e) => { setConfirmPass(e.target.value); setError(""); }}
                  disabled={resetBusy}
                />

                {error && (
                  <p className="text-rose-400 text-xs text-center">{error}</p>
                )}

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    disabled={resetBusy}
                    className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {resetBusy ? "Updating…" : "Reset Password"}
                  </button>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
                  >
                    <ArrowLeft size={13} />
                    Back to Admin Login
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── STEP 4 — Success ── */}
          {step === "success" && (
            <div className="text-center py-4 space-y-5">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
                </svg>
              </div>

              <p className="text-green-400 font-semibold text-lg syne">
                Password Reset Successful!
              </p>

              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                Your password has been updated. Login with your new credentials.
              </p>

              <button
                type="button"
                onClick={() => navigate("/admin", { replace: true })}
                className="syne bg-white text-black text-sm font-semibold rounded-xl px-8 py-2.5 tracking-wide"
              >
                Go to Admin Login →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminForgotRequest;