import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, resetPasswordApi } from "../services/authApi";
import { validateNewPasswords } from "../hooks/useAdminAuth";
import AuthPageWrapper from "../components/forgotUI/AuthPageWrapper";
import SuccessCard from "../components/forgotUI/SuccessCard";
import EmailStep from "../components/forgotUI/EmailStep";
import OTPStep from "../components/forgotUI/OTPStep";
import NewPasswordStep from "../components/forgotUI/NewPasswordStep";

const OTP_LENGTH = 6;
const TIMER_SECONDS = 60;
const MAX_RESEND = 3;

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetBusy, setResetBusy] = useState(false);

  const navItems = [
    { id: "1", label: "Home",  onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Admin", onClick: () => navigate("/admin") },
  ];

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

  const verifyOTP = (code) => {
    const target = code || otpCode;
    if (!target || target.length !== OTP_LENGTH) return;
    setOtpVerified(true);
    setStep("password");
  };

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
      if (msg.includes("Invalid OTP") || msg.includes("expired") || msg.includes("attempts")) {
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

  return (
    <AuthPageWrapper navItems={navItems}>

      {step === "email" && (
        <EmailStep
          email={email}
          setEmail={(val) => { setEmail(val); setError(""); }}
          error={error}
          loading={loading}
          onSubmit={handleSendOTP}
          onBack={() => navigate("/admin")}
        />
      )}

      {step === "otp" && (
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
          onBack={() => { setStep("email"); setOtpCode(""); setError(""); clearInterval(intervalRef.current); }}
          error={error}
        />
      )}

      {step === "password" && (
        <NewPasswordStep
          newPass={newPass}
          setNewPass={(val) => { setNewPass(val); setError(""); }}
          confirmPass={confirmPass}
          setConfirmPass={(val) => { setConfirmPass(val); setError(""); }}
          error={error}
          resetBusy={resetBusy}
          onSubmit={handleResetPassword}
          onBack={() => navigate("/admin")}
        />
      )}

      {step === "success" && (
        <SuccessCard
          heading="Password Reset Successful!"
          subtext="Your password has been updated. Login with your new credentials."
          buttonLabel="Go to Admin Login →"
          onButtonClick={() => navigate("/admin", { replace: true })}
        />
      )}

    </AuthPageWrapper>
  );
};

export default AdminForgotPassword;