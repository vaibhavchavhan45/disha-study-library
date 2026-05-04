import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { inputCls, labelCls } from "../styles/authLoginStyles";

export default function LoginForm({ email, setEmail, password, setPassword, loading, onSubmit, onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>Email</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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

      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-white/30 hover:text-white/60 text-xs transition-colors"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}