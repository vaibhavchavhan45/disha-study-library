import { useState } from "react";
import OTPInput from "./OTPInput";
import SlideFillButton from "../Buttons/SlideFillButton/SlideFillButton";
import { FIELD_OF_PREPARATION_OPTIONS } from "../../Data/fieldsOfPreparation"
import { inputClass } from "../../Styles/CTAFormInputFieldStyles"


const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-white/70 text-xs tracking-widest uppercase">{label}</label>
    {children}
  </div>
);

export default function CTAFormFields({
  fullName, setFullName,
  phone, setPhone,
  fieldOfPreparation, setFieldOfPreparation,
  otherField, setOtherField,
  onVerified,
  error,
  busy,
  otpRef,
}) {
  const [otpSent, setOtpSent] = useState(false);

  return (
    //Form title.
    <div className="flex flex-col gap-10">
      <div className="flex justify-center -mt-4">
        <div className="flex flex-col items-center">

          <span className="text-sm font-medium tracking-widest text-cyan-400/40 uppercase mt-1 md:mt-2">
            Book Your Seat
          </span>

          {/* Underline */}
          <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        </div>
      </div>

      {/* Full Name */}
      <Field label="Full Name">
        <div className="relative group">
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value.replace(/[^a-zA-Z\s]/g, ""))}
            required
            className="w-full bg-transparent border border-white/[0.08] rounded-3xl px-5 py-3.5 text-white placeholder:text-white/20 text-sm tracking-[0.01em] outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-white/[0.18] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.45)]"
          />

          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_68%)]" />
        </div>
      </Field>

      {/* Email + OTP */}
      <OTPInput ref={otpRef} onVerified={onVerified} onOtpSent={() => setOtpSent(true)} />

      {/* Phone Number: single box */}
      <Field label="Phone Number">
        <div className="relative group">
          <div className="flex items-center gap-0 border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] focus-within:border-white/[0.18] focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.45)]">
            <span className="flex items-center gap-1.5 px-4 py-3.5 text-white/55 text-sm whitespace-nowrap border-r border-white/[0.06]">
              <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "2px" }}>
                <rect width="20" height="4.67" y="0" fill="#FF9933" />
                <rect width="20" height="4.67" y="4.67" fill="#ffffff" />
                <rect width="20" height="4.67" y="9.33" fill="#138808" />
                <circle cx="10" cy="7" r="1.5" fill="none" stroke="#000080" strokeWidth="0.5" />
              </svg>
              +91
            </span>

            <span className="text-white/10 px-1 text-sm">|</span>

            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              maxLength={10}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
              required
              className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder:text-white/20 text-sm focus:outline-none"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_68%)]" />
        </div>
      </Field>

      {/* Field of Preparation */}
      <Field label="Field of Preparation">
        <div className="relative group">
          <select
            value={fieldOfPreparation}
            onChange={(event) => setFieldOfPreparation(event.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.08] rounded-3xl px-5 py-3.5 text-sm outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-white/[0.18] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.45)]"
            style={{
              color: fieldOfPreparation === "" ? "rgba(255,255,255,0.25)" : "#ffffff",
            }}
          >
            <option value="" disabled style={{ background: "#0d0d10", color: "rgba(255,255,255,0.3)" }}>
              Select your field
            </option>
            {FIELD_OF_PREPARATION_OPTIONS.map((option) => (
              <option key={option} value={option} style={{ background: "#0d0d10", color: "#ffffff" }}>
                {option}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_68%)]" />
        </div>
      </Field>

      {/* Other Field */}
      {fieldOfPreparation === "Other" && (
        <Field label="Specify Your Field">
          <div className="relative group">
            <input
              type="text"
              placeholder="What are you preparing for?"
              value={otherField}
              onChange={(event) => setOtherField(event.target.value)}
              required
              className="w-full bg-transparent border border-white/[0.08] rounded-3xl px-5 py-3.5 text-white placeholder:text-white/20 text-sm tracking-[0.01em] outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-white/[0.18] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.45)]"
            />

            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_68%)]" />
          </div>
        </Field>
      )}

      {/* Error */}
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}

      {/* Submit: centered */}
      <div className="flex justify-center">
        <SlideFillButton busy={busy}>
          {busy ? "Submitting..." : "Submit"}
        </SlideFillButton>
      </div>

    </div>
  );
}