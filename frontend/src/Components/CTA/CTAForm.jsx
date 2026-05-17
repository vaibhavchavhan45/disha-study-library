import { useState, useEffect, useRef } from "react";
import CTAFormFields from "./CTAFormFields";
import CTASuccess from "./CTASuccess";
import useCTAFormSubmit from "../../Hooks/useCTAFormSubmit";

export default function CTAForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [fieldOfPreparation, setFieldOfPreparation] = useState("");
  const [otherField, setOtherField] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const otpRef = useRef(null);

  // successCard in the center of page
  useEffect(() => {
  if (submitted && formRef.current) {
    setTimeout(() => {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  }
}, [submitted]);

//after 10 second form comes back.
useEffect(() => {
  if (!submitted) return;

  const timeout = setTimeout(() => {
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setVerifiedEmail("");
    setFieldOfPreparation("");
    setOtherField("");
    setError("");
    setBusy(false);
  }, 10000);

  return () => clearTimeout(timeout);
}, [submitted]);


//handle submission of form
  const { handleSubmit } = useCTAFormSubmit({
    fullName,
    phone,
    verifiedEmail,
    fieldOfPreparation,
    otherField,
    setError,
    setBusy,
    setSubmitted,
  });

  if (submitted) {
  return (
    <div ref={formRef}>
      <CTASuccess />
    </div>
  );
}

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <CTAFormFields
        fullName={fullName}
        setFullName={setFullName}
        phone={phone}
        setPhone={setPhone}
        fieldOfPreparation={fieldOfPreparation}
        setFieldOfPreparation={setFieldOfPreparation}
        otherField={otherField}
        setOtherField={setOtherField}
        onVerified={(email) => setVerifiedEmail(email.trim().toLowerCase())}
        verifiedEmail={verifiedEmail}
        error={error}
        busy={busy}
        otpRef={otpRef}
      />
    </form>
  );
}