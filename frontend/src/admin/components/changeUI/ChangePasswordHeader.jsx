import { X, KeyRound, ShieldAlert } from "lucide-react";

function ChangePasswordHeader({ blocked, busy, onClose }) {
  return (
    <div className="relative bg-gray-900 px-6 pt-6 pb-5 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
          {blocked
            ? <ShieldAlert size={22} className="text-red-400" />
            : <KeyRound size={22} className="text-white" />}
        </div>
        <h2 className="text-white font-semibold">
          {blocked ? "Access Restricted" : "Change Password"}
        </h2>
      </div>

      <button
        onClick={onClose}
        disabled={busy}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default ChangePasswordHeader;