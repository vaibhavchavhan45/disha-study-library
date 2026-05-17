import NeonText from "../Element/NeonText/NeonText";
import FeedbackFormFields from "./FeedbackFormFields";
import FeedbackSuccessCard from "./FeedbackSuccessCard";
import useFeedbackForm from "../../Hooks/useFeedbackForm";
import SectionDivider from "../Element/SectionDivider/SectionDivider";

export default function Feedback() {
  const {
    form,
    hoveredStar,
    submitting,
    submitted,
    error,
    thankYouRef,
    setHoveredStar,
    setForm,
    handleChange,
    handleSubmit,
    handleResetForm,
  } = useFeedbackForm();

  return (
    <section
      className={`w-full px-4 sm:px-5 md:px-6 ${submitted
          ? "py-12 sm:py-16 md:py-20 lg:min-h-[calc(100vh-140px)] lg:flex lg:items-center lg:justify-center"
          : "mt-10 md:mt-12 lg:mt-15"
        }`}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Heading */}
        <h2 className="mb-10 text-center flex items-end justify-center gap-3 md:gap-4 whitespace-nowrap">
          <span className="text-[1.4rem] sm:text-[1.55rem] md:text-[1.8rem] lg:text-[2.1rem] font-medium text-white/90 tracking-[0.01em] leading-none pb-[2px]">
            Tell Us What You
          </span>
          <NeonText className="text-[1.8rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem] tracking-[0.06em] md:tracking-[0.08em] leading-none">
            Think
          </NeonText>
        </h2>

        {/* Form Card */}
        <div
          className={`w-full max-w-xl mx-auto ${submitted ? "lg:flex lg:flex-col lg:items-center" : ""
            }`}
        >
          <div
            className={`w-full rounded-[22px] sm:rounded-[24px] relative overflow-hidden ${submitted
                ? "p-5 sm:p-6 md:p-7 lg:p-6 lg:max-w-[420px]"
                : "pt-4 sm:pt-4 md:pt-5 lg:pt-5 px-4 pb-4 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12"
              }`}
            style={{
              background: "#101010",
              border: "1px solid #1e1e1e",
              boxShadow: `
                  0 24px 60px rgba(0, 0, 0, 0.45),
                  0 8px 24px rgba(0, 0, 0, 0.28)
                `,
            }}
          >
            {/* Top Accent Bar */}
            <div
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899)",
              }}
            />

            {/* Soft glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at top left, rgba(124,58,237,0.08), transparent 28%),
                  radial-gradient(circle at top right, rgba(6,182,212,0.08), transparent 32%),
                  radial-gradient(circle at bottom center, rgba(236,72,153,0.05), transparent 30%)
                `,
              }}
            />

            {submitted ? (
              <FeedbackSuccessCard
                thankYouRef={thankYouRef}
                onReset={handleResetForm}
              />
            ) : (
              <FeedbackFormFields
                form={form}
                hoveredStar={hoveredStar}
                submitting={submitting}
                error={error}
                onFormChange={handleChange}
                onStarHover={setHoveredStar}
                onStarSelect={(star) => setForm({ ...form, rating: star })}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      {!submitted && (
        <SectionDivider className="mt-16 sm:mt-20 md:mt-24 lg:mt-28" />
      )}
    </section>
  );
}