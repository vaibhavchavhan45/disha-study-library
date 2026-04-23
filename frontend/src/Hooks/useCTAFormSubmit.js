import { DEV_EMAILS } from "../config/devConfig";
import { config } from "../config/config";
import { RATE_LIMIT_KEY, RATE_LIMIT_MS } from "../config/form_config";

export default function useCTAFormSubmit({
  fullName,
  phone,
  verifiedEmail,
  fieldOfPreparation,
  otherField,
  setError,
  setBusy,
  setSubmitted,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters.");
      return;
    }
    
    if (fullName.trim().length > 50) {
      setError("Full name must not exceed 50 characters.");
      return;
    }

    if (!verifiedEmail) {
      setError("Please verify your email first.");
      return;
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!fieldOfPreparation) {
      setError("Please select your field of preparation.");
      return;
    }

    if (fieldOfPreparation === "Other" && !otherField.trim()) {
      setError("Please specify your field of preparation.");
      return;
    }

    const normalizedEmail = verifiedEmail.trim().toLowerCase();
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);

    // prod
    // if (lastSubmit && Date.now() - Number(lastSubmit) < RATE_LIMIT_MS) {
    // development
    if (
      lastSubmit &&
      Date.now() - Number(lastSubmit) < RATE_LIMIT_MS &&
      !DEV_EMAILS.includes(normalizedEmail)
    ) {
      setError("You have already submitted today. Please try again tomorrow.");
      return;
    }

    const finalField =
      fieldOfPreparation === "Other" ? otherField : fieldOfPreparation;

    try {
      setBusy(true);

      const response = await fetch(`${config.vite_api_url}/api/booking/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: normalizedEmail,
          phone,
          fieldOfPreparation: finalField,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      if (!DEV_EMAILS.includes(normalizedEmail)) {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return { handleSubmit };
}