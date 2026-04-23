import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginAdminApi, verifyAdminOtpApi } from "../services/authApi";
import { useAdminLoginGuard } from "../hooks/useAdminAuth";
import Navbar from "../../Components/Navbar";
import { reportSuspiciousLogin } from "../services/suspiciousApi";
import { inputCls, labelCls, cardStyle } from "../components/styles/authLoginStyles";
import { setAdminToken, setAdminUser } from "../utils/adminStorage";
import OTPBoxes from "../../Components/CTA/OTPBoxes";

const OTP_LENGTH    = 6;
const TIMER_SECONDS = 60;
const MAX_RESEND    = 3;

function AdminLogin() {
  const navigate = useNavigate();
  useAdminLoginGuard();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  // OTP step
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Timer & resend
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [resendCount, setResendCount] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const intervalRef = useRef(null);

  // 6 refs for 6 boxes
  const boxRefs = [
    useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null),
  ];

  const navItems = [
    { id: "1", label: "Home",         onClick: () => navigate("/") },
    { id: "2", label: "About",        onClick: () => navigate("/about") },
    { id: "3", label: "Facilities",   onClick: () => navigate("/facilities") },
    { id: "4", label: "Gallery",      onClick: () => navigate("/gallery") },
    { id: "5", label: "Testimonials", onClick: () => navigate("/testimonial") },
    { id: "6", label: "Creator",      onClick: () => navigate("/dev") },
  ];

  const msgColor = {
    error:   "text-rose-400",
    success: "text-green-400",
    warn:    "text-amber-400",
  }[msg.type] || "";

  // Start countdown timer
  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(TIMER_SECONDS);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Step 1 — verify credentials, send OTP
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    if (!email)    return setMsg({ text: "Please enter your email.",    type: "error" });
    if (!password) return setMsg({ text: "Please enter your password.", type: "error" });

    try {
      setLoading(true);
      const data = await loginAdminApi({ email, password });
      setMsg({ text: data.message, type: "success" });
      setOtpStep(true);
      startTimer();
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 404) {
        setMsg({ text: "Trying to be a hacker? Needs bit more practice buddy 💀", type: "error" });
        reportSuspiciousLogin({ email }).catch(() => {});
      } else {
        setMsg({ text: "Something went wrong. Please try again.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — verify OTP, get JWT, go to dashboard
  const verifyOTP = async (code) => {
    const target = code || otpCode;
    if (!target || target.length !== OTP_LENGTH) return;

    setOtpInvalid(false);
    setMsg({ text: "", type: "" });

    try {
      setOtpBusy(true);
      const data = await verifyAdminOtpApi({ email, otp: target });
      setOtpVerified(true);
      setAdminToken(data.token);
      setAdminUser(data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setOtpInvalid(true);
      setMsg({
        text: err.response?.data?.message || "Invalid OTP. Please try again.",
        type: "error",
      });
    } finally {
      setOtpBusy(false);
    }
  };

  // Resend OTP — re-calls login which re-sends OTP to email
  const handleResend = async () => {
    if (resendCount >= MAX_RESEND || resendBusy) return;

    try {
      setResendBusy(true);
      setOtpCode("");
      setOtpInvalid(false);
      setMsg({ text: "", type: "" });

      await loginAdminApi({ email, password });

      setResendCount((c) => c + 1);
      startTimer();
      setMsg({ text: "OTP resent to your email.", type: "success" });
    } catch {
      setMsg({ text: "Failed to resend OTP. Please try again.", type: "error" });
    } finally {
      setResendBusy(false);
    }
  };

  // Resend section UI
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

          {/* header */}
          <div className="text-center mb-7">
            <h1 className="syne text-2xl font-bold text-white tracking-tight">
              Admin Login
            </h1>
            <p className="text-white/35 text-sm mt-1">
              Secure access — backbone of Disha Library
            </p>
          </div>

          {/* Step 1 — credentials form */}
          {!otpStep && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setMsg({ text: "", type: "" }); }}
                  placeholder="admin@gmail.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => { setPassword(e.target.value); setMsg({ text: "", type: "" }); }}
                    placeholder="••••••••••"
                    className={inputCls + " pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/admin/forgot-password")}
                  className="text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          )}

          {/* Step 2 — OTP input */}
          {otpStep && (
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
                  verifyOTP={verifyOTP}
                  boxRefs={boxRefs}
                  length={OTP_LENGTH}
                />
              </div>

              {/* Timer / Resend */}
              <div className="mt-1">
                {renderResend()}
              </div>
            </div>
          )}

          {/* message */}
          {msg.text && (
            <p className={`mt-4 text-xs text-center ${msgColor}`}>
              {msg.text}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;