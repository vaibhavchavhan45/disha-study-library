import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const DEMO_EMAIL = "demo@disha.com";
export const DEMO_PASSWORD = "demo@disha.com";
export const DEMO_OTP = "000000";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/40 uppercase tracking-widest text-[10px]">{label}</span>
      <span className="text-white/80 font-mono">{value}</span>
    </div>
  );
}

export default function DemoHint({ onFill }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mx-auto flex items-center gap-1 text-cyan-400/70 hover:text-cyan-400 text-xs transition-colors"
      >
        Recruiter? View demo login
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-xs space-y-2">
          <Row label="Email" value={DEMO_EMAIL} />
          <Row label="Password" value={DEMO_PASSWORD} />
          <Row label="OTP" value={DEMO_OTP} />

          <button
            type="button"
            onClick={onFill}
            className="mt-2 w-full rounded-lg bg-white/10 hover:bg-white/15 text-white/80 py-2 transition"
          >
            Fill demo details
          </button>
        </div>
      )}
    </div>
  );
}