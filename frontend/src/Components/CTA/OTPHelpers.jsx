export const isValidGmail = (email) => {
  return /^[^\s@]+@gmail\.com$/.test(email.trim().toLowerCase());
};

export const handleBoxChange = ({
  index,
  value,
  otpCode,
  setOtpCode,
  boxRefs,
  verifyOTP,
  length = 4,
}) => {
  const digit = value.replace(/\D/g, "").slice(-1);
  const newCode = otpCode.split("");
  newCode[index] = digit;

  const joined = newCode.join("").slice(0, length);
  setOtpCode(joined);

  if (digit && index < length - 1) {
    boxRefs[index + 1].current?.focus();
  }

  if (joined.length === length) {
    verifyOTP(joined);
  }
};

export const handleBoxKeyDown = ({
  index,
  event,
  otpCode,
  setOtpCode,
  boxRefs,
  length = 4,
}) => {
  if (event.key === "Backspace") {
    const newCode = otpCode.split("");

    if (newCode[index]) {
      newCode[index] = "";
      setOtpCode(newCode.join(""));
    } else if (index > 0) {
      boxRefs[index - 1].current?.focus();

      const previous = otpCode.split("");
      previous[index - 1] = "";
      setOtpCode(previous.join(""));
    }
  }
};

export const getBoxStyle = ({ index, otpCode, otpVerified, otpInvalid }) => {
  const filled = !!otpCode[index];
  let bottomColor = "rgba(99, 102, 241, 0.5)";

  if (otpVerified) {
    bottomColor = "rgba(52, 211, 153, 0.7)";
  } else if (otpInvalid) {
    bottomColor = "rgba(248, 113, 113, 0.7)";
  } else if (filled) {
    bottomColor = "rgba(34, 211, 238, 0.6)";
  }

  return {
    width: "52px",
    height: "52px",
    background: "rgba(255,255,255,0.05)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: `inset 0 -2px 0 0 ${bottomColor}, 0 4px 12px rgba(0,0,0,0.3)`,
    cursor: "text",
  };
};