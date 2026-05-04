import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdminApi, verifyAdminOtpApi } from "../services/authApi";
import { useAdminLoginGuard } from "../hooks/useAdminAuth";
import { reportSuspiciousLogin } from "../services/suspiciousApi";
import { setAdminToken, setAdminUser } from "../utils/adminStorage";
import { cardStyle } from "../components/styles/authLoginStyles";
import Navbar from "../../Components/Navbar";
import LoginHeader from "../components/loginUI/LoginHeader";
import LoginForm from "../components/loginUI/LoginForm";
import OTPStep from "../components/loginUI/OTPStep";

const TIMER_SECONDS = 60;
const MAX_RESEND    = 3;
const OTP_LENGTH    = 6;

function AdminLogin() {
  const navigate = useNavigate();
  useAdminLoginGuard();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [resendCount, setResendCount] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const intervalRef = useRef(null);

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

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

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

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="min-h-screen w-full flex flex-col"
    >
      <Navbar navItems={navItems} />

      <div className="flex-1 flex items-center justify-center px-4 py-12 pt-24 dm">
        <div style={cardStyle} className="p-8">

          <LoginHeader />

          {!otpStep && (
            <LoginForm
              email={email}
              setEmail={(val) => { setEmail(val); setMsg({ text: "", type: "" }); }}
              password={password}
              setPassword={(val) => { setPassword(val); setMsg({ text: "", type: "" }); }}
              loading={loading}
              onSubmit={handleLogin}
              onForgotPassword={() => navigate("/admin/forgot-password")}
            />
          )}

          {otpStep && (
            <OTPStep
              email={email}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              otpVerified={otpVerified}
              otpInvalid={otpInvalid}
              otpBusy={otpBusy}
              timer={timer}
              resendCount={resendCount}
              resendBusy={resendBusy}
              boxRefs={boxRefs}
              onVerify={verifyOTP}
              onResend={handleResend}
            />
          )}

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