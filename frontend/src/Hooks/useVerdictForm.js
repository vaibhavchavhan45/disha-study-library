import { useState, useEffect, useRef } from "react";
import { config } from "../config/config";

const STORAGE_KEY = "verdict_submissions";
const MAX_PER_DAY = 2;

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getSubmissionCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (data.date !== getTodayKey()) return 0;
    return data.count || 0;
  } catch {
    return 0;
  }
}

function incrementSubmissionCount() {
  const count = getSubmissionCount() + 1;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: getTodayKey(), count })
  );
}

export default function useVerdictForm() {
  const [form, setForm] = useState({
    firstName: "",
    fatherName: "",
    lastName: "",
    origin: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [specialMessage, setSpecialMessage] = useState(null);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const thankYouRef = useRef(null);

  // Auto cleanup after 60 seconds
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setSpecialMessage(null);
      setForm({ firstName: "", fatherName: "", lastName: "", origin: "", rating: 5 });
    }, 60000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${config.vite_api_url}/api/verdict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      incrementSubmissionCount();
      if (getSubmissionCount() >= MAX_PER_DAY) setLimitReached(true);

      setSpecialMessage(data.specialMessage || null);
      setSubmitted(true);

      setTimeout(() => {
        thankYouRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    setForm,
    submitting,
    submitted,
    specialMessage,
    error,
    limitReached,
    thankYouRef,
    handleChange,
    handleSubmit,
  };
}