import { config } from "../config/config";

export const sendOTPService = async (email) => {
  const response = await fetch(`${config.vite_api_url}/api/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP.");
  }

  return data;
};