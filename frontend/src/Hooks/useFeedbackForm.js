import { useState, useRef } from "react";
import { config } from "../config/config";

export default function useFeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    specify: "",
    rating: 0,
    message: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const thankYouRef = useRef(null);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "category" && value !== "other" ? { specify: "" } : {}),
  }));

  setError(""); 
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSubmitting(true);

  // Rating validation
  if (form.rating < 1) {
    setError("Please select a rating.");
    setSubmitting(false);
    return;
  }
    try {
      
      const response = await fetch(`${config.vite_api_url}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });


      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);

      setTimeout(() => {
        const element = thankYouRef.current;
        if (!element) return;

        if (window.innerWidth >= 1024) {
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            window.innerHeight / 2 +
            element.offsetHeight / 2 -
            40;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setError("");
    setForm({
      name: "",
      email: "",
      category: "",
      specify: "",
      rating: 0,
      message: "",
    });
  };

  return {
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
  };
}