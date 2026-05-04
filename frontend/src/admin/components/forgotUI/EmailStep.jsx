import { ArrowLeft } from "lucide-react";
import { inputCls, labelCls } from "../styles/authLoginStyles";

function EmailStep({ email, setEmail, error, loading, onSubmit, onBack }) {
  return (
    <>
      <div className="text-center mb-7">
        <h1 className="syne text-2xl font-bold text-white tracking-tight">Forgot Password</h1>
        <p className="text-white/35 text-sm mt-1">Enter your admin email to receive an OTP.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Admin Email</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
            placeholder="admin@gmail.com"
            className={inputCls}
          />
        </div>

        {error && <p className="text-rose-400 text-xs text-center">{error}</p>}

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

export default EmailStep;