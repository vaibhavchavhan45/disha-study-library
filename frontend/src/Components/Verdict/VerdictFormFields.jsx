export default function VerdictFormFields({
  form,
  submitting,
  error,
  onFormChange,
  onSubmit,
}) {
  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    padding: "12px 0",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "0.35s ease",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: "500",
    color: "rgba(255,255,255,0.35)",
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 pt-2">

        {/* First name + Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 group">
            <label style={labelStyle}>First Name</label>

            <div className="relative">
              <input
                style={inputStyle}
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={onFormChange}
                placeholder="Vaibhav"
                required
                className="placeholder:text-white/20 placeholder:italic"
              />

              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-white/5" />

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-500 group-focus-within:w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label style={labelStyle}>Last Name</label>

            <div className="relative">
              <input
                style={inputStyle}
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={onFormChange}
                placeholder="Chavhan"
                required
                className="placeholder:text-white/20 placeholder:italic"
              />

              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-white/5" />

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 transition-all duration-500 group-focus-within:w-full" />
            </div>
          </div>
        </div>

        {/* Father's name */}
        <div className="flex flex-col gap-2 group">
          <label style={labelStyle}>Father's Name</label>

          <div className="relative">
            <input
              style={inputStyle}
              type="text"
              name="fatherName"
              value={form.fatherName}
              onChange={onFormChange}
              placeholder="Your father's name"
              required
              className="placeholder:text-white/20 placeholder:italic"
            />

            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-white/5" />

            <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-500 group-focus-within:w-full" />
          </div>
        </div>

        {/* Origin */}
        <div className="flex flex-col gap-2 group">
          <label style={labelStyle}>City / Village</label>

          <div className="relative">
            <input
              style={inputStyle}
              type="text"
              name="origin"
              value={form.origin}
              onChange={onFormChange}
              placeholder="Where are you from?"
              required
              className="placeholder:text-white/20 placeholder:italic"
            />

            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-white/5" />

            <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 transition-all duration-500 group-focus-within:w-full" />
          </div>
        </div>

        {/* Rating slider */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label style={labelStyle}>How would you rate us?</label>

            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-fuchsia-200 bg-clip-text text-transparent">
                {form.rating}
              </span>

              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                /10
              </span>
            </div>
          </div>

          <div className="relative">
            <input
              type="range"
              name="rating"
              min="1"
              max="10"
              step="1"
              value={form.rating}
              onChange={onFormChange}
              className="w-full appearance-none bg-transparent cursor-pointer slider"
              style={{
                background: `linear-gradient(
                  to right,
                  #8b5cf6 0%,
                  #a855f7 ${((form.rating - 1) / 9) * 100}%,
                  rgba(255,255,255,0.08) ${((form.rating - 1) / 9) * 100}%,
                  rgba(255,255,255,0.08) 100%
                )`,
              }}
            />
          </div>

          <div
            className="flex justify-between"
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            <span>1 — Not great</span>
            <span>10 — Love it</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-center" style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              color: "#fff",
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
              border: "none",
              boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
            }}
          >
            {submitting ? "Submitting..." : "Log My Response"}
          </button>

          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
            Viewership form monitored and maintained for security purposes.
          </p>
        </div>
      </form>

      <style jsx>{`
        .slider {
          height: 4px;
          border-radius: 999px;
          transition: background 0.3s ease;
        }

        .slider::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
          border-radius: 999px;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -6px;
          width: 15px;
          height: 15px;
          border-radius: 999px;
          background: #e9d5ff;
          border: 2px solid #c084fc;
          box-shadow: 0 0 10px rgba(192, 132, 252, 0.28);
          transition: 0.25s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 0 14px rgba(192, 132, 252, 0.4);
        }
      `}</style>
    </>
  );
}
