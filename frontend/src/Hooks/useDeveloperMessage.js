import { useState, useRef } from "react";
import { blockedWords } from "../Data/randomWords";
import { config } from "../config/config";

export default function useDeveloperMessage() {
  // State Hook
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [busy, setBusy] = useState(false);

  // Ref Hooks
  const lastClickRef = useRef(0);
  const clearTimerRef = useRef(null);

  // Derived Value Hook
  const trimmedName = name.trim();

  // Input Change Hook
  const handleNameChange = (e) => {
    const value = e.target.value;

    if (value.length > 20) return;

    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
      setMessage("");
      setMessageType("");
    }
  };

  // Validation Hook
  const isValidName = (value) => {
    const trimmed = value.trim();
    const normalized = trimmed.toLowerCase().replace(/\s+/g, "");

    if (!trimmed) return false;
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return false;
    if (/\s{2,}/.test(value)) return false;
    if (trimmed.length < 2 || trimmed.length > 20) return false;

    const words = trimmed.split(/\s+/);
    if (words.length > 3) return false;
    if (words.some((word) => word.length < 2)) return false;
    if (!/[aeiou]/i.test(normalized)) return false;
    if (/^(.)\1+$/i.test(normalized)) return false;
    if (new Set(normalized).size < 2) return false;
    if (/(.)\1{2,}/i.test(normalized)) return false;
    if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(normalized)) return false;
    if (/[aeiou]{4,}/i.test(normalized)) return false;
    if (/^(.+?)\1+$/i.test(normalized)) return false;
    if (blockedWords.includes(normalized)) return false;

    const blockedPatterns = ["asdf", "qwerty", "zxcv", "poiuy", "lkjhg"];
    if (blockedPatterns.some((pattern) => normalized.includes(pattern))) return false;

    return true;
  };

  // Name Formatting Hook
  const formatName = (name) => {
    return name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Message Generator Hook
  const generateMessage = async () => {
    if (!trimmedName) return;

    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }

    const isValid = isValidName(trimmedName);

    try {
      setBusy(true);

      const response = await fetch(
        `${config.vite_api_url}/api/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmedName, isValid }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
      setMessageType(data.messageType);

      clearTimerRef.current = setTimeout(() => {
        setName("");
        setMessage("");
        setMessageType("");
      }, 20000);
    } 
    
    catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } 
    
    finally {
      setBusy(false);
    }
  };

  // Button Click Hook
  const handleClick = () => {
  if (!trimmedName || busy) return;

  const now = Date.now();
  const isFirstTime = !message;

  if (!isFirstTime && now - lastClickRef.current < 2000) return;

  lastClickRef.current = now;
  generateMessage();
};

  // Enter Key Hook
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && trimmedName) {
      handleClick();
    }
  };

  return {
    name,
    message,
    messageType,
    trimmedName,
    busy,
    handleNameChange,
    handleClick,
    handleKeyDown,
    formatName,
  };
}