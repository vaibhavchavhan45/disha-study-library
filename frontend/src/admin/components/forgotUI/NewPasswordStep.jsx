import { ArrowLeft } from "lucide-react";
import PasswordField from "./PasswordField";

function NewPasswordStep({
  newPass, setNewPass,
  confirmPass, setConfirmPass,
  error,
  resetBusy,
  onSubmit, onBack,
}) {
  return (
    <>
      <div className="text-center mb-7">
        <h1 className="syne text-2xl font-bold text-white tracking-tight">Set New Password</h1>
        <p className="text-white/35 text-sm mt-1">OTP verified. Enter your new password.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <PasswordField
          label="New Password"
          placeholder="Min 8 chars, uppercase, number, special"
          value={newPass}
          onChange={(e) => { setNewPass(e.target.value); }}
          disabled={resetBusy}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter new password"
          value={confirmPass}
          onChange={(e) => { setConfirmPass(e.target.value); }}
          disabled={resetBusy}
        />

        {error && <p className="text-rose-400 text-xs text-center">{error}</p>}

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
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            <ArrowLeft size={13} /> Back to Admin Login
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPasswordStep;