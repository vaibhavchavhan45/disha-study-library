import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldAlert, ArrowLeft } from "lucide-react";
import { resetPasswordApi } from "../services/authApi";
import { getAdminUser } from "../utils/adminStorage";
import { useAttemptTracker, validateNewPasswords } from "../hooks/useAdminAuth";
import Navbar from "../../Components/Navbar";
import { inputCls, labelCls, cardStyle } from "../components/styles/authLoginStyles";
import { clearAdminAuth } from "../utils/adminStorage";


// tiny dark password input
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

// component
const AdminForgotPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // grab email from logged-in admin if available
  const admin = getAdminUser();
  const email = admin?.email || "";

  const {
    status,
    attemptsLeft,
    timeLeft,
    errorMsg,
    setErrorMsg,
    registerFailedAttempt,
    registerSuccess,
    clearError,
    isBlocked,
  } = useAttemptTracker(email);

  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navItems = [
    { id: "1", label: "Home",  onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Admin", onClick: () => navigate("/admin") },
  ];

  const goToAdmin = () => {
    clearAdminAuth();
    navigate("/admin", { replace: true });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;

    if (!confirmEmail) {
      setErrorMsg("Please confirm your email address.");
      return;
    }

    const validationError = validateNewPasswords(newPass, confirmPass);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    try {
      setLoading(true);
      clearError();

      const data = await resetPasswordApi(token, {
        password: newPass,
        email: confirmEmail,
      });

      if (!data.success) {
        registerFailedAttempt(data.message || "Something went wrong. Please try again.");
        return;
      }

      registerSuccess();

    } catch (err) {
      const status = err.response?.status;
      if (status === 400) {
        registerFailedAttempt("This link has expired. Request a new one.");
      } else {
        registerFailedAttempt("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // render
  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="min-h-screen w-full flex flex-col"
    >
      <Navbar navItems={navItems} />

      <div className="flex-1 flex items-center justify-center px-4 py-12 pt-24 dm">
        <div style={cardStyle} className="p-8">

          {/* header */}
          {status !== "success" && (
            <div className="text-center mb-7">
              <h1 className="syne text-2xl font-bold text-white tracking-tight">
                {isBlocked ? "Access Restricted" : "Reset Password"}
              </h1>
              <p className="text-white/35 text-sm mt-1">
                {isBlocked
                  ? status === "locked"
                    ? "Too many failed attempts."
                    : "Password was recently changed."
                  : "Confirm your email and set a new password."}
              </p>
            </div>
          )}

          {/* blocked */}
          {isBlocked && (
            <div className="text-center py-6 space-y-5">
              <ShieldAlert size={32} className="mx-auto text-rose-400 mb-3" />
              <p className="text-white/50 text-sm">Try again in</p>
              <p className="text-rose-400 font-bold text-2xl mt-1">{timeLeft}</p>

              {/* back button on blocked screen */}
              <button
                type="button"
                onClick={goToAdmin}
                className="flex items-center gap-1.5 mx-auto text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                <ArrowLeft size={13} />
                Back to Admin Login
              </button>
            </div>
          )}

          {/* form */}
          {!isBlocked && status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* confirm email */}
              <div>
                <label className={labelCls}>Confirm Email</label>
                <input
                  type="email"
                  autoComplete="username"
                  value={confirmEmail}
                  onChange={(e) => { setConfirmEmail(e.target.value); clearError(); }}
                  placeholder="Re-enter your admin email"
                  className={inputCls}
                />
              </div>

              {/* new password */}
              <PasswordField
                label="New Password"
                autoComplete="new-password"
                placeholder="Min 8 chars, uppercase, number, special"
                value={newPass}
                onChange={(e) => { setNewPass(e.target.value); clearError(); }}
                disabled={loading}
              />

              {/* confirm password */}
              <PasswordField
                label="Confirm Password"
                autoComplete="new-password"
                placeholder="Re-enter new password"
                value={confirmPass}
                onChange={(e) => { setConfirmPass(e.target.value); clearError(); }}
                disabled={loading}
              />

              {/* attempts warning */}
              {status === "error" && attemptsLeft <= 2 && (
                <p className="text-amber-400 text-xs text-center">
                  {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left before lockout.
                </p>
              )}

              {/* error message */}
              {errorMsg && (
                <p className="text-rose-400 text-xs text-center">{errorMsg}</p>
              )}

              {/* submit */}
              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="syne bg-white text-black text-sm font-semibold rounded-xl px-10 py-2.5 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating…" : "Reset Password"}
                </button>
              </div>

              {/* back to admin login — below form */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={goToAdmin}
                  className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  <ArrowLeft size={13} />
                  Back to Admin Login
                </button>
              </div>

            </form>
          )}

          {/* success card */}
          {status === "success" && (
            <div className="text-center py-6 space-y-5">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12l3 3 5-5"
                  />
                </svg>
              </div>
              <p className="text-green-400 font-semibold text-lg">Password changed successfully!</p>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                Your password is updated. Login with your new credentials.
              </p>
              <button
                type="button"
                onClick={goToAdmin}
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

export default AdminForgotPassword;