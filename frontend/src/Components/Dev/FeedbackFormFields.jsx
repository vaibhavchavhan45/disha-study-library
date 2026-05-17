import ShineText from "../Element/ShineText/ShineText";
import { categories } from "../../Data/feedbackCategories";
import PremiumButton from "../Buttons/PremiumButton/PremiumButton"
import "../../Styles/feedbackInput.css"

export default function FeedbackFormFields({
  form,
  hoveredStar,
  submitting,
  error,
  onFormChange,
  onStarHover,
  onStarSelect,
  onSubmit,
}) {
  const baseFieldClass =
    "feedback-field w-full px-4 py-3 text-sm bg-transparent text-white outline-none transition-all duration-200";

  const wrapperClass =
    "w-full bg-[#161616] border border-[#222] rounded-xl p-[2px] focus-within:border-white/[0.18] transition-all duration-200";

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="relative z-10 flex flex-col gap-5 sm:gap-6"
      >
        {/* Header */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-center">
            <ShineText className="text-sm sm:text-base md:text-lg font-medium tracking-[0.22em] uppercase text-white/80">
              Share Your Feedback
            </ShineText>
            <div className="w-[88%] h-[1px] mt-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
            Name
          </label>
          <div className={wrapperClass}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onFormChange}
              placeholder="Your full name"
              required
              className={baseFieldClass}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
            Email
          </label>
          <div className={wrapperClass}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onFormChange}
              placeholder="your@gmail.com"
              required
              className={baseFieldClass}
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
            Category
          </label>
          <div className={wrapperClass}>
            <select
              name="category"
              value={form.category}
              onChange={onFormChange}
              required
              className={`w-full px-4 py-3 text-sm bg-transparent outline-none transition-all duration-200 ${form.category ? "text-white" : "text-white/40 focus:text-white/85"
                }`}
            >
              {categories.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  style={{ background: "#0d1117", color: "white" }}
                >
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specify */}
        {form.category === "other" && (
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
              Specify
            </label>
            <div className={wrapperClass}>
              <input
                type="text"
                name="specify"
                value={form.specify}
                onChange={onFormChange}
                placeholder="Tell us more..."
                required
                className={baseFieldClass}
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
            Message
          </label>
          <div className={`${wrapperClass} border-l-[3px] border-l-purple-500/25`}>
            <textarea
              name="message"
              value={form.message}
              onChange={onFormChange}
              placeholder="Write your feedback here..."
              rows={4}
              required
              className={`${baseFieldClass} resize-none`}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-2">
          <label className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
            Rating
          </label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => onStarHover(star)}
                onMouseLeave={() => onStarHover(0)}
                onClick={() => onStarSelect(star)}
                className="transition-transform hover:scale-125"
                style={{
                  fontSize: "26px",
                  color:
                    star <= (hoveredStar || form.rating)
                      ? "#facc15"
                      : "rgba(255,255,255,0.15)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  filter:
                    star <= (hoveredStar || form.rating)
                      ? "drop-shadow(0 0 10px rgba(250,204,21,0.6))"
                      : "none",
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs text-center mt-1">{error}</p>
        )}

        {/* Submit */}
        <div className="flex justify-center mt-3">
          <PremiumButton
            type="submit"
            disabled={submitting}
            submitting={submitting}
            minWidth="220px"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </PremiumButton>
        </div>
      </form>
    </>
  );
}