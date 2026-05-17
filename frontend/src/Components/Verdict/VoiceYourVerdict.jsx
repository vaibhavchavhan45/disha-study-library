import useVerdictForm from "../../Hooks/useVerdictForm";
import VerdictFormFields from "./VerdictFormFields";
import VerdictSuccessCard from "./VerdictSuccessCard";
import ShineText from "../Element/ShineText/ShineText";

export default function VoiceYourVerdict() {
  const {
    form,
    submitting,
    submitted,
    specialMessage,
    error,
    limitReached,
    thankYouRef,
    handleChange,
    handleSubmit,
  } = useVerdictForm();

  return (
    <section
      className="verdict-root w-full pt-15 md:pt-20 px-4 md:px-6 lg:px-8"
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
    >

      {/* Section Label */}
      <div className="flex justify-center mb-7">
        <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-md">
          <ShineText>
            Visitor's Record
          </ShineText>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-14 md:mb-16 lg:mb-18 xl:mb-18">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
          <span className="text-white">Mandatory! Fill Once.</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We Never Forget.
          </span>
        </h2>
        <p className="mt-4 text-white/65 text-sm sm:text-md font-semibold mx-auto leading-relaxed text-center whitespace-nowrap">
          As a visitor of the website, kindly fill out the below form.
        </p>
        <p className="mt-1 text-white/65 text-sm sm:text-md mx-auto font-semibold leading-relaxed text-center whitespace-nowrap">
          This helps us maintain proper visitor's & security records.
        </p>
      </div>

      {/* Form + Success */}
      <div className="max-w-lg mx-auto w-full">

        <VerdictFormFields
          form={form}
          submitting={submitting}
          error={error}
          onFormChange={handleChange}
          onSubmit={handleSubmit}
        />

        {submitted && (
          <VerdictSuccessCard
            thankYouRef={thankYouRef}
            firstName={form.firstName}
            specialMessage={specialMessage}
          />
        )}

      </div>

      {/* HR */}
      <div className="w-full border-t border-white/10 mt-22 md:mt-24 lg:mt-30 xl:mt-30" />

    </section>
  );
}