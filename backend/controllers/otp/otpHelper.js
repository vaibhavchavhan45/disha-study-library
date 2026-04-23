// Generate OTP as 4 digit random number
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};