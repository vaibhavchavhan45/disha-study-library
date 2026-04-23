import {
  handleBoxChange,
  handleBoxKeyDown,
  getBoxStyle,
} from "./OTPHelpers";
import "../../Animations/spin.css"

export default function OTPBoxes({
  otpCode,
  setOtpCode,
  otpVerified,
  otpInvalid,
  busy,
  timer,
  verifyOTP,
  boxRefs,
  length = 4,
}) {
  return (
    <div className="flex gap-3 items-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={boxRefs[index]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otpCode[index] || ""}
          placeholder="—"
          onChange={(event) =>
            handleBoxChange({
              index,
              value: event.target.value,
              otpCode,
              setOtpCode,
              boxRefs,
              verifyOTP,
              length,
            })
          }
          onKeyDown={(event) =>
            handleBoxKeyDown({
              index,
              event,
              otpCode,
              setOtpCode,
              boxRefs,
              length,
            })
          }
          disabled={busy || timer === 0}
          style={getBoxStyle({
            index,
            otpCode,
            otpVerified,
            otpInvalid,
          })}
        />
      ))}

      {busy && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(34,211,238,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animation: "spin 0.8s linear infinite", marginLeft: "4px" }}
        >
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      )}

      {otpInvalid && !busy && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f87171"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ marginLeft: "4px" }}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </div>
  );
}