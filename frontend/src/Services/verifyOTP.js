import { config } from "../config/config";

export const verifyOTPService = async (email, otp) => {
  const response = await fetch(`${config.vite_api_url}/api/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed.");
  }

  return data;
};