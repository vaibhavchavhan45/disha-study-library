import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  value,
  onChange,
  disabled = false,
  placeholder = ""
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      {/* Label */}
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm
                     text-gray-800 placeholder-gray-400 outline-none ring-0
                     focus:border-gray-400 focus:bg-white transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Toggle visibility */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}